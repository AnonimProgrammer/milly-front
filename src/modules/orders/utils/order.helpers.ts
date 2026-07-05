import type { OrderItem } from "../types";

export function getOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function mergeItems(existing: OrderItem[], incoming: OrderItem[]): OrderItem[] {
  const merged = existing.map((item) => ({ ...item }));

  for (const item of incoming) {
    const match = merged.find((entry) => entry.menuItemId === item.menuItemId);
    if (match) {
      match.quantity += item.quantity;
    } else {
      merged.push({ ...item });
    }
  }

  return merged;
}

export function formatOrderId(id: string): string {
  return `#${id.replace(/-/g, "").slice(-7).toUpperCase()}`;
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatAmount(amount: number): string {
  return `${amount.toFixed(2)} ₼`;
}
