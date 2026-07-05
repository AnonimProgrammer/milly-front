import type { MenuItem } from "@/modules/menu/types";
import type { Order, OrderStatus } from "@/modules/orders/types";
import type { ApiOrderStatus } from "@/modules/orders/api/types";
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
    pendingAddition: null,
    rejectedAdditions: [],
    paidAmount: 0,
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
