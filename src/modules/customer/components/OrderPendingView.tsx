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
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col items-center justify-center bg-card px-3 py-6 text-center text-card-foreground sm:px-5 sm:py-12">
      <div className={`mb-4 h-10 w-10 sm:mb-6 sm:h-12 sm:w-12 ${spinnerRing}`} />
      <h1 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
        Order pending approval
      </h1>
      <p className="mb-4 text-sm text-muted-foreground sm:mb-6 sm:text-base">
        Your order has been sent to the kitchen. A waiter will confirm it shortly.
      </p>

      <div className="mb-4 w-full rounded-xl border border-border p-3 text-left sm:p-4">
        <p className="text-xs text-muted-foreground">
          {formatOrderId(order.id)} · {tableLabel}
        </p>
        <p className="mt-1 text-xs text-muted-foreground/80">
          Created {formatDateTime(order.createdAt)}
        </p>
      </div>

      <div className="w-full rounded-xl border border-border p-3 sm:p-4">
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
        <p className="text-xs text-muted-foreground sm:text-sm">Total amount</p>
        <p className="text-xl font-bold text-foreground sm:text-2xl">{formatAmount(total)}</p>
      </div>
    </div>
  );
}
