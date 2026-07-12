"use client";

import { textMuted } from "@/modules/shared/theme/classNames";

type MyVenuesErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function MyVenuesErrorState({ message, onRetry }: MyVenuesErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <p className={`text-sm ${textMuted}`}>{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="text-sm font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
      >
        Retry
      </button>
    </div>
  );
}
