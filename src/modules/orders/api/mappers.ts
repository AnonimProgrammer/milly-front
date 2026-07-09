import type { Order, OrderStatus } from "../types";
import type { ApiOrderStatus, StaffOrderResponse } from "./types";

type MenuLookup = Map<string, { name: string }>;
type TableLookup = Map<string, { label: string }>;

function mapOrderStatus(status: ApiOrderStatus): OrderStatus | null {
  switch (status) {
    case "PENDING":
      return "pending";
    case "APPROVED":
      return "approved";
    case "CLOSED":
      return "completed";
    case "REJECTED":
      return null;
  }
}

export function mapStaffOrderResponse(
  order: StaffOrderResponse,
  menuById: MenuLookup,
  tableById: TableLookup,
): Order | null {
  const status = mapOrderStatus(order.status);
  if (!status) {
    return null;
  }

  return {
    id: order.id,
    tableId: order.tableId,
    tableLabel: tableById.get(order.tableId)?.label ?? "Table",
    items: order.items.map((item) => ({
      menuItemId: item.menuItemId,
      name: menuById.get(item.menuItemId)?.name ?? "Unknown item",
      price: item.unitPrice,
      quantity: item.quantity,
    })),
    status,
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.updatedAt),
    approvedAt: order.approvedAt ? new Date(order.approvedAt) : null,
    estimatedPreparationMinutes: order.estimatedPreparationMinutes ?? null,
    estimatedPreparationDisplay: order.estimatedPreparationDisplay ?? null,
    pendingAddition: null,
    rejectedAdditions: [],
    paidAmount: order.paidAmount ?? 0,
  };
}

export function mapStaffOrders(
  orders: StaffOrderResponse[],
  menuById: MenuLookup,
  tableById: TableLookup,
): Order[] {
  return orders
    .map((order) => mapStaffOrderResponse(order, menuById, tableById))
    .filter((order): order is Order => order !== null);
}
