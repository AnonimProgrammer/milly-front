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
      className="pointer-events-none fixed bottom-4 right-4 z-[110] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${
            toast.type === "error"
              ? "border-red-200 bg-white text-red-800"
              : "border-zinc-200 bg-white text-black"
          }`}
          role="alert"
        >
          <p className="font-medium leading-snug">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 text-xs font-medium text-zinc-400 transition-colors hover:text-black"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
