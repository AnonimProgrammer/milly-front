import type { VenueRole } from "@/modules/venue/api/types";

type MemberRoleBadgeProps = {
  role: VenueRole;
};

export function MemberRoleBadge({ role }: MemberRoleBadgeProps) {
  if (role === "MANAGER") {
    return (
      <span className="rounded-full border border-orange-200/80 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
        Manager
      </span>
    );
  }

  return (
    <span className="rounded-full border border-green-200/80 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      Waiter
    </span>
  );
}
