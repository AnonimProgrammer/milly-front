export type TableStatus = "ACTIVE" | "INACTIVE";

export type TableResponse = {
  id: string;
  venueId: string;
  label: string;
  status: TableStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTableRequest = {
  label: string;
};
