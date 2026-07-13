import type { ListMembersParams } from "../api/types";

export type MemberListFilter = "active" | "managers" | "owner" | "blocked" | "all";

export const memberListFilters: { id: MemberListFilter; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "managers", label: "Managers" },
  { id: "owner", label: "Owner" },
  { id: "blocked", label: "Blocked" },
  { id: "all", label: "All" },
];

export function memberFilterToParams(filter: MemberListFilter): Omit<ListMembersParams, "cursor"> {
  switch (filter) {
    case "active":
      return { status: "active" };
    case "managers":
      return { status: "active", role: "MANAGER" };
    case "owner":
      return { status: "active", role: "OWNER" };
    case "blocked":
      return { status: "inactive" };
    case "all":
      return { status: "all" };
  }
}

export function memberFilterEmptyMessage(filter: MemberListFilter): string {
  switch (filter) {
    case "active":
      return "No active members.";
    case "managers":
      return "No managers in this venue.";
    case "owner":
      return "No owner found.";
    case "blocked":
      return "No blocked members.";
    case "all":
      return "No members in this venue.";
  }
}

export function memberFilterShowsStatus(filter: MemberListFilter): boolean {
  return filter === "all";
}

export function memberCountLabel(count: number, filter: MemberListFilter): string {
  const noun = count === 1 ? "member" : "members";
  const activeFilter = memberListFilters.find((option) => option.id === filter);

  if (filter === "active" || filter === "all") {
    return `${count} ${noun}`;
  }

  return `${count} ${activeFilter?.label.toLowerCase() ?? noun}`;
}
