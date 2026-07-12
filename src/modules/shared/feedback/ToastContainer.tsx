"use client";

import { useSyncExternalStore } from "react";
import { dismissToast, getServerToasts, getToasts, subscribeToasts } from "./toast";

export function ToastContainer() {
  const toasts = useSyncExternalStore(subscribeToasts, getToasts, getServerToasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-[110] flex w-[min(100%-1.5rem,24rem)] flex-col gap-2 sm:right-4 sm:top-auto sm:bottom-4 sm:w-full sm:max-w-sm"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex min-w-0 items-start justify-between gap-2 rounded-xl border px-3 py-2.5 text-xs shadow-lg sm:gap-3 sm:px-4 sm:py-3 sm:text-sm ${
            toast.type === "error"
              ? "border-red-500/30 bg-card text-red-600 dark:text-red-400"
              : "border-border bg-card text-foreground"
          }`}
          role="alert"
        >
          <p className="min-w-0 flex-1 break-words font-medium leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
