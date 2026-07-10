"use client";

import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { useTableChatWs } from "../ws";
import { createChatMessage, type ChatMessage } from "../types/chatMessage";

function GeminiIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 28 28"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 2a1 1 0 0 1 1 1v3.3a6.7 6.7 0 0 0 4.7 4.7H21a1 1 0 0 1 0 2h-3.3a6.7 6.7 0 0 0-4.7 4.7V21a1 1 0 0 1-2 0v-3.3a6.7 6.7 0 0 0-4.7-4.7H3a1 1 0 0 1 0-2h3.3A6.7 6.7 0 0 0 11 6.3V3a1 1 0 0 1 1-1zm6 4a.75.75 0 0 1 .75.75v1.5a2.25 2.25 0 0 0 1.5 1.5h1.5a.75.75 0 0 1 0 1.5h-1.5a2.25 2.25 0 0 0-1.5 1.5v1.5a.75.75 0 0 1-1.5 0v-1.5a2.25 2.25 0 0 0-1.5-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5a2.25 2.25 0 0 0 1.5-1.5v-1.5A.75.75 0 0 1 18 6z"
      />
    </svg>
  );
}

type PanelPosition = {
  top: number;
  right: number;
  width: number;
};

type ChatbotIconButtonProps = {
  tableId: string;
  className?: string;
};

export function ChatbotIconButton({ tableId, className = "" }: ChatbotIconButtonProps) {
  const [open, setOpen] = useState(false);
  const [wsActive, setWsActive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [panelPosition, setPanelPosition] = useState<PanelPosition | null>(null);
  const [mounted, setMounted] = useState(false);
  const inputId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setWsActive(true);
    }
  }, [open]);

  useEffect(() => {
    setMessages([]);
    setWsActive(false);
    setOpen(false);
  }, [tableId]);

  const handleIncomingMessage = useCallback((event: { text: string }) => {
    setMessages((current) => [
      ...current,
      createChatMessage("Milly AI", event.text, "assistant"),
    ]);
  }, []);

  const { sendMessage, connected } = useTableChatWs(tableId, wsActive, handleIncomingMessage);

  const updatePanelPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const width = Math.min(384, window.innerWidth - 24);

    setPanelPosition({
      top: rect.bottom + 8,
      right: Math.max(12, window.innerWidth - rect.right),
      width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setPanelPosition(null);
      return;
    }

    updatePanelPosition();

    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, updatePanelPosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const container = messagesContainerRef.current;
    if (container === null) {
      return;
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = draft.trim();
    if (text === "") {
      return;
    }

    setMessages((current) => [...current, createChatMessage("You", text, "user")]);
    sendMessage(text);
    setDraft("");
  };

  const chatPanel =
    open && panelPosition && mounted
      ? createPortal(
          <>
            <button
              type="button"
              aria-label="Close AI chat overlay"
              className="fixed inset-0 z-[100] cursor-default bg-black/20"
              onClick={handleClose}
            />
            <section
              aria-label="AI chat"
              style={{
                top: panelPosition.top,
                right: panelPosition.right,
                width: panelPosition.width,
              }}
              className="fixed z-[101] flex h-[28rem] max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Milly AI</p>
                  <p
                    className={`text-xs ${connected ? "font-medium text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                  >
                    {connected ? "Connected" : "Connecting..."}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close AI chat"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClose();
                  }}
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <div
                ref={messagesContainerRef}
                className="min-h-0 flex-1 overflow-y-auto bg-muted px-4 py-4"
              >
                {messages.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Send a message to chat with Milly.</p>
                ) : (
                  <div className="space-y-3">
                    {messages.map((message) => {
                      const isUser = message.tone === "user";

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                              isUser
                                ? "rounded-br-sm bg-primary text-primary-foreground"
                                : "rounded-bl-sm border border-border bg-card text-foreground"
                            }`}
                          >
                            <p
                              className={
                                isUser ? "sr-only" : "mb-1 text-xs font-medium text-muted-foreground"
                              }
                            >
                              {message.author}
                            </p>
                            <p className="leading-relaxed">{message.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <form className="shrink-0 border-t border-border bg-card p-3" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 rounded-full border border-border bg-muted py-1 pl-4 pr-1">
                  <input
                    id={inputId}
                    aria-label="Message"
                    className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    placeholder="Ask about the menu..."
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    disabled={!connected}
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!connected || draft.trim() === ""}
                  >
                    Send
                  </button>
                </div>
              </form>
            </section>
          </>,
          document.body,
        )
      : null;

  return (
    <div className={`relative overflow-visible ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group inline-flex h-11 items-center gap-2.5 overflow-visible rounded-full border border-border bg-card py-2 pl-3 pr-4 text-foreground shadow-sm transition-colors duration-200 hover:bg-purple-500/10 hover:shadow-md"
        onClick={() => setOpen((current) => !current)}
      >
        <GeminiIcon className="size-6 shrink-0 text-purple-600 transition-colors duration-200 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300" />
        <span className="text-sm font-medium leading-none">Ask AI</span>
      </button>

      {chatPanel}
    </div>
  );
}
