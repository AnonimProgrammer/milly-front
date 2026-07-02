export type VenueRole = "MANAGER" | "WAITER";

export type VenueMembership = {
  venueId: string;
  venueName: string;
  location: string;
  role: VenueRole;
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
