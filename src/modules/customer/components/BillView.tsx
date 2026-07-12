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
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col bg-card px-2.5 py-3 text-card-foreground sm:px-5 sm:py-6">
      <header className="mb-3 flex flex-col gap-1.5 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
        <div className="min-w-0">
          <h1 className="text-base font-bold text-foreground sm:text-2xl">{tableLabel}</h1>
        </div>
        <div className="sm:shrink-0 sm:text-right">
          <p className="text-[11px] text-muted-foreground sm:text-sm">Total amount</p>
          <p className="text-base font-bold text-foreground sm:text-2xl">{formatAmount(total)}</p>
        </div>
      </header>

      {order.estimatedPreparationDisplay && (
        <section className="mb-3 rounded-lg border border-border bg-muted p-2.5 sm:mb-6 sm:rounded-xl sm:p-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-muted-foreground sm:text-sm">
                Kitchen preparation
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground sm:mt-1 sm:text-lg">
                Estimated {order.estimatedPreparationDisplay}
              </p>
            </div>
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary sm:h-12 sm:w-12"
              aria-hidden="true"
            >
              <svg
                className="h-4 w-4 sm:h-[22px] sm:w-[22px]"
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

      <section className="mb-3 rounded-lg border border-border p-2.5 sm:mb-8 sm:rounded-xl sm:p-4">
        <div className="mb-2 flex items-end justify-between gap-2 sm:mb-3 sm:gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground sm:text-sm">Left to pay</p>
            <p className="text-sm font-semibold text-foreground sm:text-xl">
              {formatAmount(remaining)}
            </p>
          </div>
          {paidAmount > 0 && (
            <p className="shrink-0 text-[11px] text-muted-foreground sm:text-sm">
              Paid {formatAmount(paidAmount)}
            </p>
          )}
        </div>
        <PaymentProgress total={total} paid={paidAmount} />
      </section>

      <section className="mb-3 flex-1 sm:mb-8">
        <OrderDetails items={order.items} />
      </section>

      {remaining > 0 ? (
        <>
          <Button className="py-2.5 text-xs sm:py-3 sm:text-sm" onClick={() => setPaymentOpen(true)}>
            Pay the bill
          </Button>
          {onAddMore && (
            <button
              type="button"
              onClick={onAddMore}
              className="mt-2 w-full py-1.5 text-xs font-medium text-muted-foreground underline sm:mt-3 sm:py-2 sm:text-sm"
            >
              Add more items
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border px-3 py-4 text-center sm:gap-3 sm:rounded-xl sm:px-4 sm:py-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-14 sm:w-14"
            aria-hidden="true"
          >
            <svg
              className="h-5 w-5 sm:h-7 sm:w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs font-medium text-foreground sm:text-sm">
            Bill fully paid. Thank you!
          </p>
        </div>
      )}

      <PaymentSheet
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        billTotal={total}
        remaining={remaining}
        onPay={handlePay}
      />
    </div>
  );
}
