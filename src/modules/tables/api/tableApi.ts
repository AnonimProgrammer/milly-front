import { apiRequest, apiRequestNoContent } from "@/modules/shared/api";
import type { CreateTableRequest, TableQrResponse, TableResponse } from "./types";

function tablesPath(venueId: string) {
  return `/api/v1/venues/${venueId}/tables`;
}

export async function listTables(venueId: string): Promise<TableResponse[]> {
  return apiRequest<TableResponse[]>(tablesPath(venueId));
}

export async function createTable(
  venueId: string,
  request: CreateTableRequest,
): Promise<TableResponse> {
  return apiRequest<TableResponse>(tablesPath(venueId), {
    method: "POST",
    body: request,
  });
}

export async function deactivateTable(venueId: string, tableId: string): Promise<void> {
  return apiRequestNoContent(`${tablesPath(venueId)}/${tableId}/deactivate`, {
    method: "POST",
  });
}

export async function generateTableQr(
  venueId: string,
  tableId: string,
): Promise<TableQrResponse> {
  return apiRequest<TableQrResponse>(`${tablesPath(venueId)}/${tableId}/qr`, {
    method: "POST",
  });
}
