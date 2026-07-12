"use client";

import type { VenueMembership } from "../api/types";

function formatRole(role: VenueMembership["role"]): string {
  return role === "MANAGER" ? "Manager" : "Waiter";
}

type VenueRoleBadgeProps = {
  role: VenueMembership["role"];
};

export function VenueRoleBadge({ role }: VenueRoleBadgeProps) {
  const label = formatRole(role);

  if (role === "MANAGER") {
    return (
      <span className="rounded-full border border-orange-200/80 bg-orange-100 px-2.5 py-0.5 text-sm font-medium text-orange-800 dark:border-orange-800/40 dark:bg-orange-900/20 dark:text-orange-300">
        {label}
      </span>
    );
  }

  return (
    <span className="rounded-full border border-green-200/80 bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:border-green-800/40 dark:bg-green-900/20 dark:text-green-400">
      {label}
    </span>
  );
}
