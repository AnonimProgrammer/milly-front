import { apiRequest } from "@/modules/shared/api";
import type { CreateVenueRequest, CreateVenueResponse, VenueMembership } from "./types";

export async function getMyVenues(): Promise<VenueMembership[]> {
  return apiRequest<VenueMembership[]>("/api/v1/venues");
}

export async function getVenueMembership(venueId: string): Promise<VenueMembership> {
  return apiRequest<VenueMembership>(`/api/v1/venues/${venueId}/me`, { silent: true });
}

export async function createVenue(request: CreateVenueRequest): Promise<CreateVenueResponse> {
  return apiRequest<CreateVenueResponse>("/api/v1/venues", {
    method: "POST",
    body: request,
  });
}
