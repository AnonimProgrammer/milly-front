import { apiRequest } from "@/modules/shared/api";
import type {
  CreateVenueInvitationRequest,
  CreateVenueInvitationResponse,
  RedeemVenueInvitationRequest,
  VenueMembership,
} from "./types";

export async function createVenueInvitation(
  venueId: string,
  request: CreateVenueInvitationRequest,
): Promise<CreateVenueInvitationResponse> {
  return apiRequest<CreateVenueInvitationResponse>(`/api/v1/venues/${venueId}/invitations`, {
    method: "POST",
    body: request,
  });
}

export async function redeemVenueInvitation(
  request: RedeemVenueInvitationRequest,
): Promise<VenueMembership> {
  return apiRequest<VenueMembership>("/api/v1/invitations/redeem", {
    method: "POST",
    body: request,
  });
}
