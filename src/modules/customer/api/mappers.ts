import type { MenuItem } from "@/modules/menu";
import type { ApiOrderStatus, Order, OrderStatus } from "@/modules/orders";
import type { PublicMenuItemResponse, PublicOrderResponse } from "./types";

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

export function mapPublicMenuItem(item: PublicMenuItemResponse): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    category: "Mains",
    price: item.price,
    approximatePreparationMinutes: item.approximatePreparationMinutes,
  };
}

export function mapPublicOrder(
  order: PublicOrderResponse,
  menuById: Map<string, MenuItem>,
  tableLabel: string,
): Order | null {
  const status = mapOrderStatus(order.status);
  if (!status) {
    return null;
  }

  return {
    id: order.id,
    tableId: order.tableId,
    tableLabel,
    items: order.items.map((item) => ({
      menuItemId: item.menuItemId,
      name: menuById.get(item.menuItemId)?.name ?? "Unknown item",
      price: item.unitPrice,
      quantity: item.quantity,
    })),
    status,
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.createdAt),
    approvedAt: order.approvedAt ? new Date(order.approvedAt) : null,
    estimatedPreparationMinutes: order.estimatedPreparationMinutes ?? null,
    estimatedPreparationDisplay: order.estimatedPreparationDisplay ?? null,
    pendingAddition: null,
    rejectedAdditions: [],
    paidAmount: order.paidAmount ?? 0,
  };
}

export function mapPublicOrders(
  orders: PublicOrderResponse[],
  menuItems: MenuItem[],
  tableLabel: string,
): Order[] {
  const menuById = new Map(menuItems.map((item) => [item.id, item]));

  return orders
    .map((order) => mapPublicOrder(order, menuById, tableLabel))
    .filter((order): order is Order => order !== null);
}

export function toMenuLookup(menuItems: MenuItem[]): Map<string, MenuItem> {
  return new Map(menuItems.map((item) => [item.id, item]));
}
