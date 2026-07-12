import { X } from "lucide-react";
import type { FormEvent, RefObject } from "react";
import { createPortal } from "react-dom";
import type { ChatMessage } from "../types/chatMessage";
import type { ChatPanelPosition } from "../hooks/useChatPanelPosition";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";

type ChatPanelProps = {
  mounted: boolean;
  position: ChatPanelPosition;
  connected: boolean;
  messages: ChatMessage[];
  draft: string;
  limitReached: boolean;
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ChatPanel({
  mounted,
  position,
  connected,
  messages,
  draft,
  limitReached,
  messagesContainerRef,
  onClose,
  onDraftChange,
  onSubmit,
}: ChatPanelProps) {
  if (!mounted) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close AI chat overlay"
        className="fixed inset-0 z-[100] cursor-default bg-black/20"
        onClick={onClose}
      />
      <section
        aria-label="AI chat"
        style={{
          top: position.top,
          right: position.right,
          width: position.width,
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
              onClose();
            }}
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <ChatMessageList messages={messages} containerRef={messagesContainerRef} />

        <ChatComposer
          draft={draft}
          connected={connected}
          limitReached={limitReached}
          onDraftChange={onDraftChange}
          onSubmit={onSubmit}
        />
      </section>
    </>,
    document.body,
  );
}
