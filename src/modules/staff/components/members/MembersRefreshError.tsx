"use client";

import { listRow, secondaryButton } from "@/modules/shared/theme/classNames";

type MembersRefreshErrorProps = {
  onRetry: () => void;
};

export function MembersRefreshError({ onRetry }: MembersRefreshErrorProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/50 p-4 ${listRow}`}
    >
      <p className="text-sm text-foreground">Couldn&apos;t refresh members.</p>
      <button
        type="button"
        onClick={onRetry}
        className={`shrink-0 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium ${secondaryButton}`}
      >
        Retry
      </button>
    </div>
  );
}
