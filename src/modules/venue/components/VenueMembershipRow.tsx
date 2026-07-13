"use client";

import { listRow, spinnerRing, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueMembership } from "../api/types";
import { VenueRoleBadge } from "./VenueRoleBadge";

type VenueMembershipRowProps = {
  venue: VenueMembership;
  isNavigating: boolean;
  disabled: boolean;
  onSelect: (venueId: string) => void;
};

export function VenueMembershipRow({
  venue,
  isNavigating,
  disabled,
  onSelect,
}: VenueMembershipRowProps) {
  const isBlocked = venue.status === "inactive";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(venue.venueId)}
      className={`flex w-full items-center justify-between gap-3 p-3.5 text-left disabled:cursor-wait ${listRow} ${
        isNavigating ? "opacity-70" : isBlocked ? "opacity-80" : ""
      }`}
    >
      <div className="min-w-0">
        <span className="text-sm font-medium text-foreground">{venue.venueName}</span>
        {isBlocked ? (
          <p className={`mt-0.5 text-xs ${textMuted}`}>Access blocked</p>
        ) : null}
      </div>
      {isNavigating ? (
        <div className={`h-4 w-4 shrink-0 ${spinnerRing}`} aria-hidden="true" />
      ) : isBlocked ? (
        <span className="shrink-0 rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Blocked
        </span>
      ) : (
        <VenueRoleBadge role={venue.role} />
      )}
    </button>
  );
}
