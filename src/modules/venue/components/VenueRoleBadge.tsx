"use client";

import type { VenueMembership } from "../api/types";
import { formatVenueRole } from "../utils/venueRole";

type VenueRoleBadgeProps = {
  role: VenueMembership["role"];
};

const roleStyles: Record<VenueMembership["role"], string> = {
  OWNER:
    "border-purple-200/80 bg-purple-100 text-purple-800 dark:border-purple-800/40 dark:bg-purple-900/20 dark:text-purple-300",
  MANAGER:
    "border-orange-200/80 bg-orange-100 text-orange-800 dark:border-orange-800/40 dark:bg-orange-900/20 dark:text-orange-300",
  EMPLOYEE:
    "border-green-200/80 bg-green-100 text-green-800 dark:border-green-800/40 dark:bg-green-900/20 dark:text-green-400",
};

export function VenueRoleBadge({ role }: VenueRoleBadgeProps) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-sm font-medium ${roleStyles[role]}`}
    >
      {formatVenueRole(role)}
    </span>
  );
}
