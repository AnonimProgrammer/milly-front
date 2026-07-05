"use client";

import { useSyncExternalStore } from "react";
import {
  getPendingRequestCount,
  subscribeApiActivity,
} from "../api/apiActivity";

export function GlobalLoadingIndicator() {
  const pendingCount = useSyncExternalStore(
    subscribeApiActivity,
    getPendingRequestCount,
    () => 0,
  );

  if (pendingCount === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-white/50 backdrop-blur-[1px]"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-lg">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-black" />
      </div>
    </div>
  );
}
