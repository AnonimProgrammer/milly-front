"use client";

import { useEffect, useState } from "react";
import { Button } from "@/modules/shared/ui";
import { formatAmount, getOrderTotal } from "@/modules/orders";
import type { Order } from "@/modules/orders";
import { PaymentProgress, PaymentSheet, type PaymentType } from "@/modules/billing";
import { OrderDetails } from "./OrderDetails";
import { showToast } from "@/modules/shared/feedback";

type BillViewProps = {
  tableLabel: string;
  order: Order;
  onAddMore?: () => void;
};

export function BillView({ tableLabel, order, onAddMore }: BillViewProps) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
    setPaidAmount(0);
  }, [order.id]);

  const total = getOrderTotal(order.items);
  const remaining = Math.max(0, total - paidAmount);

  function handlePay(amount: number, _type: PaymentType): boolean {
    if (amount <= 0 || amount > remaining) {
      return false;
    }

    setPaidAmount((current) => current + amount);
    showToast(`Payment of ${formatAmount(amount)} processed successfully!`, "success");
    return true;
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
