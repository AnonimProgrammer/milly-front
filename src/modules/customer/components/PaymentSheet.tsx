"use client";

import { useState } from "react";
import { BottomSheet, Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentType } from "../types/payment";

type PaymentSheetProps = {
  open: boolean;
  onClose: () => void;
  remaining: number;
  onPay: (amount: number, type: PaymentType) => boolean;
};

type PaymentStep = "amount" | "provider";

export function PaymentSheet({ open, onClose, remaining, onPay }: PaymentSheetProps) {
  const [step, setStep] = useState<PaymentStep>("amount");
  const [customAmount, setCustomAmount] = useState("");
  const [splitPeople, setSplitPeople] = useState("2");
  const [activeType, setActiveType] = useState<PaymentType | null>(null);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [error, setError] = useState("");

  function handleClose() {
    setStep("amount");
    setActiveType(null);
    setCustomAmount("");
    setSelectedAmount(0);
    setError("");
    onClose();
  }

  function handleSelectAmountType(type: PaymentType) {
    if (type === "full") {
      setSelectedAmount(remaining);
      setActiveType("full");
      setStep("provider");
    } else {
      setActiveType(type);
    }
  }

  function handleCustomAmountSubmit() {
    const amt = parseFloat(customAmount);
    if (isNaN(amt) || amt <= 0 || amt > remaining) {
      setError("Invalid payment amount");
      return;
    }
    setError("");
    setSelectedAmount(amt);
    setStep("provider");
  }

  function handleSplitAmountSubmit() {
    const people = Math.max(2, parseInt(splitPeople, 10) || 2);
    const share = remaining / people;
    setSelectedAmount(share);
    setStep("provider");
  }

  function handlePay() {
    if (!activeType) return;
    const success = onPay(selectedAmount, activeType);
    if (!success) {
      setError("Payment failed");
      return;
    }
    handleClose();
  }

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      title={step === "amount" ? "Pay the bill" : `Pay ${formatAmount(selectedAmount)}`}
    >
      <div className="flex flex-col gap-3">
        {step === "amount" && (
          <>
            {!activeType && (
              <>
                <Button onClick={() => handleSelectAmountType("full")}>
                  Full amount — {formatAmount(remaining)}
                </Button>
                <Button variant="secondary" onClick={() => handleSelectAmountType("custom")}>
                  Custom amount
                </Button>
                <Button variant="secondary" onClick={() => handleSelectAmountType("split")}>
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
                <div className="flex flex-col gap-2 pt-2">
                  <Button
                    onClick={handleCustomAmountSubmit}
                    disabled={!customAmount || parseFloat(customAmount) <= 0}
                  >
                    Continue
                  </Button>
                  <Button variant="ghost" onClick={() => setActiveType(null)}>
                    Back
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
                <p className="text-sm font-medium text-neutral-600">
                  Your share:{" "}
                  {formatAmount(
                    remaining / Math.max(2, parseInt(splitPeople, 10) || 2),
                  )}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button onClick={handleSplitAmountSubmit}>Continue</Button>
                  <Button variant="ghost" onClick={() => setActiveType(null)}>
                    Back
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {step === "provider" && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              Confirm payment of {formatAmount(selectedAmount)}
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button onClick={handlePay}>Pay now</Button>
              <Button variant="ghost" onClick={() => setStep("amount")}>
                Back
              </Button>
            </div>
          </div>
        )}

        {error && <p className="mt-1 text-center text-sm font-medium text-red-600">{error}</p>}
      </div>
    </BottomSheet>
  );
}
