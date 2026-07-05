export type TableStatus = "active" | "inactive";

export type VenueTable = {
  id: string;
  label: string;
  status: TableStatus;
  qrToken: string;
};
