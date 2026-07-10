import type { MemberStatus } from "../../types/members";

type MemberStatusBadgeProps = {
  status: MemberStatus;
};

const statusLabels: Record<MemberStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  invited: "Invited",
};

export function MemberStatusBadge({ status }: MemberStatusBadgeProps) {
  if (status === "active") {
    return (
      <span className="rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200/80 dark:border-green-800/40 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
        {statusLabels[status]}
      </span>
    );
  }

  if (status === "invited") {
    return (
      <span className="rounded-full bg-amber-100 dark:bg-amber-900/20 border border-amber-200/80 dark:border-amber-800/40 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400">
        {statusLabels[status]}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
      {statusLabels[status]}
    </span>
  );
}
