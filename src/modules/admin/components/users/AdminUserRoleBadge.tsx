import type { SystemRole } from "../../api/types";
import { formatSystemRole } from "../../utils/userFilters";

type AdminUserRoleBadgeProps = {
  role: SystemRole;
};

const roleStyles: Record<SystemRole, string> = {
  ADMIN:
    "border-amber-200/80 dark:border-amber-800/40 bg-amber-100 dark:bg-amber-900/20 text-amber-900 dark:text-amber-300",
  USER: "border-border bg-muted text-muted-foreground",
};

export function AdminUserRoleBadge({ role }: AdminUserRoleBadgeProps) {
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${roleStyles[role]}`}>
      {formatSystemRole(role)}
    </span>
  );
}
