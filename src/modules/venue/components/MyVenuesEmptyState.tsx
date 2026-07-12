"use client";

import { textMuted } from "@/modules/shared/theme/classNames";

type MyVenuesEmptyStateProps = {
  message?: string;
};

export function MyVenuesEmptyState({
  message = "You haven't joined any venues yet.",
}: MyVenuesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <span className="mb-2 text-muted-foreground/40">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      </span>
      <p className={`text-sm font-light ${textMuted}`}>{message}</p>
    </div>
  );
}
