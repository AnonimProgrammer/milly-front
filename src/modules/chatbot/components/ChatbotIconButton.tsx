"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useTableChatWs } from "../ws";
import { createChatMessage, type ChatMessage } from "../types/chatMessage";

type ChatbotIconButtonProps = {
  tableId: string;
  className?: string;
};

export function ChatbotIconButton({ tableId, className = "" }: ChatbotIconButtonProps) {
  const [open, setOpen] = useState(false);
  const [wsActive, setWsActive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const inputId = useId();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setWsActive(true);
    }
  }, [open]);

  useEffect(() => {
    setMessages([]);
    setWsActive(false);
  }, [tableId]);

  const handleIncomingMessage = useCallback((event: { text: string }) => {
    setMessages((current) => [
      ...current,
      createChatMessage("Milly AI", event.text, "assistant"),
    ]);
  }, []);

  const { sendMessage, connected } = useTableChatWs(tableId, wsActive, handleIncomingMessage);

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

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
        className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white pl-2.5 pr-3.5 text-black shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50 hover:shadow active:scale-95"
        onClick={() => setOpen((current) => !current)}
      >
        <Image
          src="/ai-chatbot.jpeg"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="h-7 w-7 object-contain"
        />
        <span className="text-sm font-medium leading-none">Ask AI</span>
      </button>

      {open && (
        <section
          aria-label="AI chat"
          className="absolute right-0 top-14 z-50 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white text-black shadow-2xl"
        >
          <div className="shrink-0 flex items-start justify-between gap-4 border-b border-neutral-100 px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Milly AI</p>
              <p
                className={`text-xs ${connected ? "font-medium text-green-600" : "text-neutral-500"}`}
              >
                {connected ? "Connected" : "Connecting..."}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close AI chat"
              className="rounded-full px-2 py-1 text-lg leading-none text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
              onClick={() => setOpen(false)}
            >
              x
            </button>
          </div>

          <div
            ref={messagesContainerRef}
            className="min-h-0 flex-1 overflow-y-auto bg-neutral-50 px-4 py-4"
          >
            {messages.length === 0 ? (
              <p className="text-sm text-neutral-500">Send a message to chat with Milly.</p>
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
                            ? "rounded-br-sm bg-black text-white"
                            : "rounded-bl-sm border border-neutral-200 bg-white text-black"
                        }`}
                      >
                        <p className={isUser ? "sr-only" : "mb-1 text-xs font-medium text-neutral-500"}>
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

          <form className="shrink-0 border-t border-neutral-100 bg-white p-3" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 py-1 pl-4 pr-1">
              <input
                id={inputId}
                aria-label="Message"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
                placeholder="Ask about the menu..."
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={!connected}
              />
              <button
                type="submit"
                className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
                disabled={!connected || draft.trim() === ""}
              >
                Send
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
