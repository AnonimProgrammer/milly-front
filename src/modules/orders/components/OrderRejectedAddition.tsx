"use client";

import type { OrderAddition } from "../types";
import { formatDateTime } from "../utils/order.helpers";

type OrderRejectedAdditionProps = {
  addition: OrderAddition;
};

export function OrderRejectedAddition({ addition }: OrderRejectedAdditionProps) {
  return (
    <div className="mt-5 rounded-xl border border-border bg-muted/50 p-4 opacity-70">
      <p className="mb-2.5 text-xs font-medium uppercase tracking-wide text-muted-foreground line-through">
        Rejected · {formatDateTime(addition.createdAt)}
      </p>
      <ul className="space-y-1.5 text-base text-muted-foreground">
        {addition.items.map((item) => (
          <li key={item.menuItemId} className="line-through">
            {item.quantity}× {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
