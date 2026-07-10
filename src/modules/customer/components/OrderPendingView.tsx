"use client";

import {
  CollapsibleOrderItemList,
  formatAmount,
  formatDateTime,
  formatOrderId,
  getOrderTotal,
} from "@/modules/orders";
import type { Order } from "@/modules/orders";

type OrderPendingViewProps = {
  order: Order;
  tableLabel: string;
};

export function OrderPendingView({ order, tableLabel }: OrderPendingViewProps) {
  const total = getOrderTotal(order.items);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col items-center justify-center bg-white px-5 py-12 text-center">
      <div className="mb-6 h-12 w-12 animate-pulse rounded-full border-2 border-neutral-300 border-t-black" />
      <h1 className="mb-2 text-xl font-semibold text-black">Order pending approval</h1>
      <p className="mb-6 text-neutral-500">
        Your order has been sent to the kitchen. A waiter will confirm it shortly.
      </p>

      <div className="mb-4 w-full rounded-xl border border-neutral-200 p-4 text-left">
        <p className="text-xs text-neutral-500">
          {formatOrderId(order.id)} · {tableLabel}
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Created {formatDateTime(order.createdAt)}
        </p>
      </div>

      <div className="w-full rounded-xl border border-neutral-200 p-4">
        <CollapsibleOrderItemList
          items={order.items}
          listClassName="mb-4 space-y-1 text-left text-sm text-neutral-600"
          expandButtonClassName="mb-4 text-sm font-medium text-neutral-500 underline hover:text-neutral-700"
          renderItem={(item) => (
            <>
              {item.quantity}× {item.name}
            </>
          )}
        />
        <p className="text-sm text-neutral-500">Total amount</p>
        <p className="text-2xl font-bold text-black">{formatAmount(total)}</p>
      </div>
    </div>
  );
}
