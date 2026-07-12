import { useId, type FormEvent } from "react";
import { MAX_CHAT_MESSAGES } from "../constants";

type ChatComposerProps = {
  draft: string;
  connected: boolean;
  limitReached: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ChatComposer({
  draft,
  connected,
  limitReached,
  onDraftChange,
  onSubmit,
}: ChatComposerProps) {
  const inputId = useId();

  return (
    <form className="shrink-0 border-t border-border bg-card p-3" onSubmit={onSubmit}>
      {limitReached ? (
        <p className="px-1 pb-2 text-xs text-muted-foreground">
          Message limit reached ({MAX_CHAT_MESSAGES}).
        </p>
      ) : null}
      <div className="flex items-center gap-2 rounded-full border border-border bg-muted py-1 pl-4 pr-1">
        <input
          id={inputId}
          aria-label="Message"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          placeholder={limitReached ? "Message limit reached" : "Ask about the menu..."}
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          disabled={!connected || limitReached}
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!connected || limitReached || draft.trim() === ""}
        >
          Send
        </button>
      </div>
    </form>
  );
}
