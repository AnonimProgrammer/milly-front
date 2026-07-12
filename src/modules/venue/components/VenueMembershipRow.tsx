"use client";

import { listRow, spinnerRing } from "@/modules/shared/theme/classNames";
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
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(venue.venueId)}
      className={`flex w-full items-center justify-between p-3.5 text-left disabled:cursor-wait ${listRow} ${
        isNavigating ? "opacity-70" : ""
      }`}
    >
      <span className="text-sm font-medium text-foreground">{venue.venueName}</span>
      {isNavigating ? (
        <div className={`h-4 w-4 ${spinnerRing}`} aria-hidden="true" />
      ) : (
        <VenueRoleBadge role={venue.role} />
      )}
    </button>
  );
}
