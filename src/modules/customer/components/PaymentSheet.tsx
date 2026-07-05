"use client";

import { useState } from "react";
import { BottomSheet, Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders/utils/order.helpers";
import type { PaymentType } from "../types/payment";

type PaymentSheetProps = {
  open: boolean;
  onClose: () => void;
  remaining: number;
  onPay: (amount: number, type: PaymentType) => boolean;
};

export function PaymentSheet({ open, onClose, remaining, onPay }: PaymentSheetProps) {
  const [customAmount, setCustomAmount] = useState("");
  const [splitPeople, setSplitPeople] = useState("2");
  const [activeType, setActiveType] = useState<PaymentType | null>(null);
  const [error, setError] = useState("");

  function handleClose() {
    setActiveType(null);
    setCustomAmount("");
    setError("");
    onClose();
  }

  function handlePay(amount: number, type: PaymentType) {
    const success = onPay(amount, type);
    if (!success) {
      setError("Invalid payment amount");
      return;
    }
    handleClose();
  }

  return (
    <BottomSheet open={open} onClose={handleClose} title="Pay the bill">
      <div className="flex flex-col gap-3">
        {!activeType && (
          <>
            <Button onClick={() => handlePay(remaining, "full")}>
              Full amount — {formatAmount(remaining)}
            </Button>
            <Button variant="secondary" onClick={() => setActiveType("custom")}>
              Custom amount
            </Button>
            <Button variant="secondary" onClick={() => setActiveType("split")}>
              Split the bill
            </Button>
          </>
        )}

        {activeType === "custom" && (
          <div className="space-y-3">
            <label className="block text-sm text-neutral-600">
              Amount to pay (max {formatAmount(remaining)})
            </label>
            <input
              type="number"
              min="0.01"
              max={remaining}
              step="0.01"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-black outline-none focus:border-black"
              placeholder="0.00"
            />
            <div className="flex flex-col gap-3">
              <Button variant="ghost" onClick={() => setActiveType(null)}>
                Back
              </Button>
              <Button
                onClick={() => handlePay(parseFloat(customAmount), "custom")}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
              >
                Pay
              </Button>
            </div>
          </div>
        )}

        {activeType === "split" && (
          <div className="space-y-3">
            <label className="block text-sm text-neutral-600">
              Number of people splitting
            </label>
            <input
              type="number"
              min="2"
              value={splitPeople}
              onChange={(e) => setSplitPeople(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-black outline-none focus:border-black"
            />
            <p className="text-sm text-neutral-600">
              Your share:{" "}
              {formatAmount(
                remaining / Math.max(2, parseInt(splitPeople, 10) || 2),
              )}
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="ghost" onClick={() => setActiveType(null)}>
                Back
              </Button>
              <Button
                onClick={() =>
                  handlePay(
                    remaining / Math.max(2, parseInt(splitPeople, 10) || 2),
                    "split",
                  )
                }
              >
                Pay my share
              </Button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </BottomSheet>
  );
}
