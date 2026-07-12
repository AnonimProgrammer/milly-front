"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChatConversation } from "../hooks/useChatConversation";
import { useChatPanelPosition } from "../hooks/useChatPanelPosition";
import { ChatPanel } from "./ChatPanel";
import { GeminiIcon } from "./GeminiIcon";

type ChatbotIconButtonProps = {
  tableId: string;
  className?: string;
};

export function ChatbotIconButton({ tableId, className = "" }: ChatbotIconButtonProps) {
  const [open, setOpen] = useState(false);
  const [wsActive, setWsActive] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      setWsActive(true);
    }
  }, [open]);

  useEffect(() => {
    setWsActive(false);
    setOpen(false);
  }, [tableId]);

  const { mounted, panelPosition } = useChatPanelPosition(open, triggerRef, handleClose);
  const {
    messages,
    draft,
    setDraft,
    connected,
    limitReached,
    messagesContainerRef,
    submitDraft,
  } = useChatConversation(tableId, wsActive);

  return (
    <div className={`relative overflow-visible ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="group inline-flex h-8 items-center gap-2 overflow-visible rounded-full border border-border bg-card p-1.5 text-foreground shadow-sm transition-colors duration-200 hover:bg-purple-500/10 hover:shadow-md sm:h-11 sm:gap-2.5 sm:p-0 sm:py-2 sm:pl-3 sm:pr-4"
        onClick={() => setOpen((current) => !current)}
      >
        <GeminiIcon className="size-4 shrink-0 text-purple-600 transition-colors duration-200 group-hover:text-purple-700 dark:text-purple-400 dark:group-hover:text-purple-300 sm:size-6" />
        <span className="hidden text-sm font-medium leading-none sm:inline">Ask AI</span>
      </button>

      {open && panelPosition ? (
        <ChatPanel
          mounted={mounted}
          position={panelPosition}
          connected={connected}
          messages={messages}
          draft={draft}
          limitReached={limitReached}
          messagesContainerRef={messagesContainerRef}
          onClose={handleClose}
          onDraftChange={setDraft}
          onSubmit={submitDraft}
        />
      ) : null}
    </div>
  );
}
