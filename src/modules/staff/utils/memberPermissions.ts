import type { VenueRole } from "@/modules/venue";
import type { VenueMember } from "../types/members";

export function canEditMember(
  viewerRole: VenueRole,
  member: VenueMember,
  viewerEmail: string,
): boolean {
  if (member.email === viewerEmail) {
    return false;
  }

  if (member.role === "OWNER") {
    return false;
  }

  if (viewerRole === "OWNER") {
    return member.role === "MANAGER" || member.role === "EMPLOYEE";
  }

  if (viewerRole === "MANAGER") {
    return member.role === "EMPLOYEE";
  }

  return false;
}
