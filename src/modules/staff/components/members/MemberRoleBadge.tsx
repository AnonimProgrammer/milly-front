import type { VenueRole } from "@/modules/venue";
import { formatVenueRole } from "@/modules/venue/utils/venueRole";

type MemberRoleBadgeProps = {
  role: VenueRole;
};

const roleStyles: Record<VenueRole, string> = {
  OWNER: "border-purple-200/80 dark:border-purple-800/40 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300",
  MANAGER: "border-orange-200/80 dark:border-orange-800/40 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300",
  EMPLOYEE: "border-green-200/80 dark:border-green-800/40 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400",
};

export function MemberRoleBadge({ role }: MemberRoleBadgeProps) {
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${roleStyles[role]}`}>
      {formatVenueRole(role)}
    </span>
  );
}
