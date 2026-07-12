import { X } from "lucide-react";
import type { RefObject, SubmitEvent } from "react";
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
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
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

  const isSheet = position.mode === "sheet";

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
        style={
          isSheet
            ? undefined
            : {
                top: position.top,
                right: position.right,
                width: position.width,
              }
        }
        className={
          isSheet
            ? "fixed inset-x-0 bottom-0 z-[101] flex h-[min(88dvh,100%)] max-h-[88dvh] flex-col overflow-hidden rounded-t-2xl border border-border bg-card text-card-foreground shadow-2xl pb-[env(safe-area-inset-bottom)]"
            : "fixed z-[101] flex h-[min(28rem,calc(100dvh-5rem))] max-h-[calc(100dvh-5rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl"
        }
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
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
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground sm:h-9 sm:w-9"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
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
