import { listMenuItems, mapMenuItemResponse, type MenuItem } from "@/modules/menu";
import { listTables, mapTableResponse, type VenueTable } from "@/modules/tables";
import { listAllOrders } from "../api/orderApi";
import { mapStaffOrders } from "../api/mappers";
import type { Order } from "../types";
import { toOrderDateRange } from "../utils/order.helpers";

export type StaffOrdersSupportingData = {
  menuItems: MenuItem[];
  tables: VenueTable[];
};

export const emptySupportingData: StaffOrdersSupportingData = {
  menuItems: [],
  tables: [],
};

export function toStaffOrderLookups({ menuItems, tables }: StaffOrdersSupportingData) {
  return {
    menuById: new Map(menuItems.map((item) => [item.id, item])),
    tableById: new Map(tables.map((table) => [table.id, table])),
  };
}

export async function loadStaffSupportingData(
  venueId: string,
  isManager: boolean,
): Promise<StaffOrdersSupportingData> {
  if (!isManager) {
    return emptySupportingData;
  }

  const [menuResponses, tableResponses] = await Promise.all([
    listMenuItems(venueId, { background: true }),
    listTables(venueId, { background: true }),
  ]);

  return {
    menuItems: menuResponses.map(mapMenuItemResponse),
    tables: tableResponses.map(mapTableResponse),
  };
}

export async function fetchMappedStaffOrders(
  venueId: string,
  date: string,
  data: StaffOrdersSupportingData,
  options?: { background?: boolean },
): Promise<Order[]> {
  const { from, to } = toOrderDateRange(date);
  const { menuById, tableById } = toStaffOrderLookups(data);
  const orderResponses = await listAllOrders(
    venueId,
    { from, to },
    { background: options?.background },
  );

  return mapStaffOrders(orderResponses, menuById, tableById);
}
