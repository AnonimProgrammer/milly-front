export type VenueRole = "MANAGER" | "WAITER";

export type VenueMembership = {
  venueId: string;
  venueName: string;
  location: string;
  role: VenueRole;
};
