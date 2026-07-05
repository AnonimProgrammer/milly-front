import type { MemberStatus } from "../types";

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
      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        {statusLabels[status]}
      </span>
    );
  }

  if (status === "invited") {
    return (
      <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
        {statusLabels[status]}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
      {statusLabels[status]}
    </span>
  );
}
