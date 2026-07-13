import type { UserStatus } from "../../api/types";
import { formatUserStatus } from "../../utils/userFilters";

type AdminUserStatusBadgeProps = {
  status: UserStatus;
};

export function AdminUserStatusBadge({ status }: AdminUserStatusBadgeProps) {
  if (status === "ACTIVE") {
    return (
      <span className="rounded-full border border-green-200/80 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:border-green-800/40 dark:bg-green-900/20 dark:text-green-400">
        {formatUserStatus(status)}
      </span>
    );
  }

  if (status === "SUSPENDED") {
    return (
      <span className="rounded-full border border-red-200/80 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-300">
        {formatUserStatus(status)}
      </span>
    );
  }

  return (
    <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {formatUserStatus(status)}
    </span>
  );
}
