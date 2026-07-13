export type VenueRole = "OWNER" | "MANAGER" | "EMPLOYEE";

export type VenueMembershipStatus = "active" | "inactive" | "invited";

export type VenueMembership = {
  venueId: string;
  venueName: string;
  location: string;
  role: VenueRole;
  status: VenueMembershipStatus;
};

export type CreateVenueRequest = {
  name: string;
  location: string;
};

export type CreateVenueResponse = {
  id: string;
  name: string;
  location: string;
  role: VenueRole;
};

export type CreateVenueInvitationRequest = {
  role: VenueRole;
};

export type CreateVenueInvitationResponse = {
  token: string;
  inviteUrl: string;
  role: VenueRole;
};

export type RedeemVenueInvitationRequest = {
  token: string;
};
