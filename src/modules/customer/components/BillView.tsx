"use client";

import { useState } from "react";
import { Button } from "@/modules/shared/ui";
import { formatAmount, getOrderTotal } from "@/modules/orders";
import type { Order } from "@/modules/orders";
import {
  PaymentProgress,
  PaymentSheet,
  processPayment,
  type PaymentIntent,
  type PaymentResult,
} from "@/modules/billing";
import { OrderDetails } from "./OrderDetails";
import { showToast } from "@/modules/shared/feedback";

type BillViewProps = {
  tableLabel: string;
  order: Order;
  onAddMore?: () => void;
  onPaymentProcessed?: () => void | Promise<void>;
};

export function BillView({
  tableLabel,
  order,
  onAddMore,
  onPaymentProcessed,
}: BillViewProps) {
  const [paymentOpen, setPaymentOpen] = useState(false);

  const total = getOrderTotal(order.items);
  const paidAmount = order.paidAmount;
  const remaining = Math.max(0, total - paidAmount);

  async function handlePay(intent: PaymentIntent): Promise<PaymentResult> {
    const result = await processPayment(order.tableId, order.id, intent);

    if (result.success) {
      showToast(
        `Payment of ${formatAmount(result.payment.amount)} processed successfully!`,
        "success",
      );
      await onPaymentProcessed?.();
    }

    return result;
  }


  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col bg-white px-5 py-6">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">{tableLabel}</h1>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-500">Total amount</p>
          <p className="text-2xl font-bold text-black">{formatAmount(total)}</p>
        </div>
      </header>

      {order.estimatedPreparationDisplay && (
        <section className="mb-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-neutral-500">Kitchen preparation</p>
              <p className="mt-1 text-lg font-semibold text-black">
                Estimated {order.estimatedPreparationDisplay}
              </p>
            </div>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black"
              aria-hidden="true"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
          </div>
        </section>
      )}

      <section className="mb-8 rounded-xl border border-neutral-200 p-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-sm text-neutral-500">Left to pay</p>
            <p className="text-xl font-semibold text-black">{formatAmount(remaining)}</p>
          </div>
          {paidAmount > 0 && (
            <p className="text-sm text-neutral-500">Paid {formatAmount(paidAmount)}</p>
          )}
        </div>
        <PaymentProgress total={total} paid={paidAmount} />
      </section>

      <section className="mb-8 flex-1">
        <OrderDetails items={order.items} />
      </section>

      {remaining > 0 ? (
        <>
          <Button onClick={() => setPaymentOpen(true)}>Pay the bill</Button>
          {onAddMore && (
            <button
              type="button"
              onClick={onAddMore}
              className="mt-3 w-full py-2 text-sm font-medium text-neutral-500 underline"
            >
              Add more items
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 px-4 py-6 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-black"
            aria-hidden="true"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-black">Bill fully paid. Thank you!</p>
        </div>
      )}

      <PaymentSheet
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        remaining={remaining}
        onPay={handlePay}
      />
    </div>
  );
}
