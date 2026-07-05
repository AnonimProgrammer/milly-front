import type { Order } from "../types";
import { mergeItems } from "./order.helpers";

export function approveOrderInList(orders: Order[], orderId: string): Order[] {
  return orders.map((order) => {
    if (order.id !== orderId) {
      return order;
    }

    const now = new Date();

    if (order.status === "pending") {
      return { ...order, status: "approved", updatedAt: now };
    }

    if (order.pendingAddition?.status === "pending") {
      return {
        ...order,
        items: mergeItems(order.items, order.pendingAddition.items),
        pendingAddition: null,
        updatedAt: now,
      };
    }

    return order;
  });
}

export function rejectOrderInList(orders: Order[], orderId: string): Order[] {
  return orders.flatMap((order) => {
    if (order.id !== orderId) {
      return [order];
    }

    const now = new Date();

    if (order.status === "pending") {
      return [];
    }

    if (order.pendingAddition?.status === "pending") {
      return [
        {
          ...order,
          pendingAddition: null,
          rejectedAdditions: [
            ...order.rejectedAdditions,
            { ...order.pendingAddition, status: "rejected" as const },
          ],
          updatedAt: now,
        },
      ];
    }

    return [order];
  });
}

export function closeOrderInList(orders: Order[], orderId: string): Order[] {
  return orders.map((order) =>
    order.id === orderId
      ? { ...order, status: "completed", updatedAt: new Date() }
      : order,
  );
}
