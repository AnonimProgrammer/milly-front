"use client";

import {
  CollapsibleOrderItemList,
  formatAmount,
  formatDateTime,
  formatOrderId,
  getOrderTotal,
} from "@/modules/orders";
import type { Order } from "@/modules/orders";
import { spinnerRing } from "@/modules/shared/theme/classNames";

type OrderPendingViewProps = {
  order: Order;
  tableLabel: string;
};

export function OrderPendingView({ order, tableLabel }: OrderPendingViewProps) {
  const total = getOrderTotal(order.items);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col items-center justify-center bg-card px-5 py-12 text-center text-card-foreground">
      <div className={`mb-6 h-12 w-12 ${spinnerRing}`} />
      <h1 className="mb-2 text-xl font-semibold text-foreground">Order pending approval</h1>
      <p className="mb-6 text-muted-foreground">
        Your order has been sent to the kitchen. A waiter will confirm it shortly.
      </p>

      <div className="mb-4 w-full rounded-xl border border-border p-4 text-left">
        <p className="text-xs text-muted-foreground">
          {formatOrderId(order.id)} · {tableLabel}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/80">
          Created {formatDateTime(order.createdAt)}
        </p>
      </div>

      <div className="w-full rounded-xl border border-border p-4">
        <CollapsibleOrderItemList
          items={order.items}
          listClassName="mb-4 space-y-1 text-left text-sm text-muted-foreground"
          expandButtonClassName="mb-4 text-sm font-medium text-muted-foreground underline hover:text-foreground"
          renderItem={(item) => (
            <>
              {item.quantity}× {item.name}
            </>
          )}
        />
        <p className="text-sm text-muted-foreground">Total amount</p>
        <p className="text-2xl font-bold text-foreground">{formatAmount(total)}</p>
      </div>
    </div>
  );
}
