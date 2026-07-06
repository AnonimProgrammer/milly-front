import type { Order } from "@/modules/orders";

export function selectActiveOrderForTable(orders: Order[], tableId: string): Order | null {
  const active = orders.filter(
    (order) =>
      order.tableId === tableId &&
      (order.status === "pending" || order.status === "approved"),
  );

  if (active.length === 0) {
    return null;
  }

  return active.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  )[0];
}
