import type { VenueRole } from "@/modules/venue";

type MemberRoleBadgeProps = {
  role: VenueRole;
};

export function MemberRoleBadge({ role }: MemberRoleBadgeProps) {
  if (role === "MANAGER") {
    return (
      <span className="rounded-full border border-orange-200/80 dark:border-orange-800/40 bg-orange-100 dark:bg-orange-900/20 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:text-orange-300">
        Manager
      </span>
    );
  }

  return (
    <span className="rounded-full border border-green-200/80 dark:border-green-800/40 bg-green-100 dark:bg-green-900/20 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
      Waiter
    </span>
  );
}
