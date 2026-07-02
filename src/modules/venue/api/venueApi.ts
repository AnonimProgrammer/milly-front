import { apiRequest } from "@/modules/shared/api";
import type { VenueMembership } from "./types";

export async function getMyVenues(): Promise<VenueMembership[]> {
  return apiRequest<VenueMembership[]>("/api/v1/venues");
}
