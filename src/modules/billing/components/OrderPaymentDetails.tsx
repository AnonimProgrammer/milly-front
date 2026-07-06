"use client";

import type { Order } from "@/modules/orders";
import { formatAmount, getOrderTotal, OrderActionButton } from "@/modules/orders";

type OrderPaymentDetailsProps = {
  order: Order;
  onCloseOrder: (orderId: string) => void;
};

export function OrderPaymentDetails({ order, onCloseOrder }: OrderPaymentDetailsProps) {
  const total = getOrderTotal(order.items);
  const isFullyPaid = order.status === "completed" || (total > 0 && order.paidAmount >= total);
  const remaining = order.status === "completed" ? 0 : Math.max(0, total - order.paidAmount);
  const canClose = order.status === "approved";

  return (
    <div className="mt-4 border-t border-zinc-200 pt-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-400">
        Payment
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between gap-8 text-base">
            <span className="text-zinc-500">Total amount</span>
            <span className="font-medium text-black">{formatAmount(total)}</span>
          </div>
          <div className="flex items-baseline justify-between gap-8 text-base">
            <span className="text-zinc-500">Left to pay</span>
            <span className="font-medium text-black">{formatAmount(remaining)}</span>
          </div>
        </div>
        <PaymentCompleteIndicator complete={isFullyPaid} />
      </div>

      {canClose && (
        <div className="mt-4 border-t border-zinc-200 pt-4">
          <OrderActionButton onClick={() => onCloseOrder(order.id)}>
            Close order
          </OrderActionButton>
        </div>
      )}
    </div>
  );
}

function PaymentCompleteIndicator({ complete }: { complete: boolean }) {
  if (complete) {
    return (
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600"
        aria-label="Payment complete"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="h-10 w-10 shrink-0 rounded-full border-2 border-zinc-200"
      aria-label="Payment incomplete"
    />
  );
}
