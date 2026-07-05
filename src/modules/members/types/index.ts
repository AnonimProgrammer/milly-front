import type { VenueRole } from "@/modules/venue/api/types";

export type MemberStatus = "active" | "inactive" | "invited";

export type VenueMember = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: VenueRole;
  status: MemberStatus;
};
