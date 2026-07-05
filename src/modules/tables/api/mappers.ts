import type { VenueTable } from "../types";
import type { TableResponse } from "./types";

export function mapTableResponse(table: TableResponse): VenueTable {
  return {
    id: table.id,
    label: table.label,
    status: table.status === "ACTIVE" ? "active" : "inactive",
    qrImageUrl: table.qrImageUrl,
  };
}
