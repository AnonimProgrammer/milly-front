export type TableStatus = "ACTIVE" | "INACTIVE";

export type TableResponse = {
  id: string;
  venueId: string;
  label: string;
  status: TableStatus;
  qrImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TableQrResponse = {
  tableId: string;
  customerUrl: string;
  qrImageUrl: string;
};

export type CreateTableRequest = {
  label: string;
};

export type UpdateTableLabelRequest = {
  label: string;
};
