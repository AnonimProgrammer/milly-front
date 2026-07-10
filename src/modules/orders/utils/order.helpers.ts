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

/** Collapse duplicate menu lines returned by the API into one row per menu item. */
export function normalizeOrderItems(items: OrderItem[]): OrderItem[] {
  return mergeItems([], items);
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

export function formatOrderDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayOrderDate(): string {
  return formatOrderDateInput(new Date());
}

function toOffsetDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absoluteOffset / 60));
  const offsetMins = pad(absoluteOffset % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}${sign}${offsetHours}:${offsetMins}`;
}

export function toOrderDateRange(dateInput: string): { from: string; to: string } {
  const [year, month, day] = dateInput.split("-").map(Number);
  const from = new Date(year, month - 1, day, 0, 0, 0, 0);
  const to = new Date(year, month - 1, day, 23, 59, 59, 999);

  return {
    from: toOffsetDateTime(from),
    to: toOffsetDateTime(to),
  };
}
