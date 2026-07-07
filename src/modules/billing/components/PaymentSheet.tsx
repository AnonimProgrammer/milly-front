"use client";

import { useState } from "react";
import { BottomSheet, Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentType, PaymentProvider } from "../types/payment";
import { PaymentProviderStep } from "./payment-sheet/PaymentProviderStep";
import { getSheetTitle } from "./payment-sheet/paymentSheet.utils";
import type { PaymentStep } from "./payment-sheet/types";

type PaymentSheetProps = {
  open: boolean;
  onClose: () => void;
  remaining: number;
  onPay: (amount: number, type: PaymentType) => boolean;
};

export function PaymentSheet({ open, onClose, remaining, onPay }: PaymentSheetProps) {
  const [step, setStep] = useState<PaymentStep>("amount");
  const [customAmount, setCustomAmount] = useState("");
  const [splitPeople, setSplitPeople] = useState("2");
  const [activeType, setActiveType] = useState<PaymentType | null>(null);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  
  // Credit Card Form mock states
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [error, setError] = useState("");
  
  // Simulation testing states
  const [simulateFailure, setSimulateFailure] = useState(false);

  function handleClose() {
    setStep("amount");
    setActiveType(null);
    setCustomAmount("");
    setSelectedAmount(0);
    setSelectedProvider(null);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
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
    if (!activeType || !selectedProvider) return;
    
    setStep("processing");
    setError("");

    setTimeout(() => {
      if (simulateFailure) {
        setStep("error");
      } else {
        const success = onPay(selectedAmount, activeType);
        if (success) {
          setStep("success");
        } else {
          setStep("error");
        }
      }
    }, 1500);
  }

  const getProviderName = (provider: PaymentProvider | null) => {
    switch (provider) {
      case "apple-pay":
        return "Apple Pay";
      case "google-pay":
        return "Google Pay";
      case "card":
        return "Credit Card";
      default:
        return "";
    }
  };

  return (
    <BottomSheet open={open} onClose={handleClose} title={getSheetTitle(step, selectedAmount)}>
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
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-black transition-all outline-none focus:ring-1 focus:ring-black focus:border-black"
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
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-black transition-all outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
                <p className="text-sm text-neutral-600 font-medium">
                  Your share:{" "}
                  {formatAmount(
                    remaining / Math.max(2, parseInt(splitPeople, 10) || 2),
                  )}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button onClick={handleSplitAmountSubmit}>
                    Continue
                  </Button>
                  <Button variant="ghost" onClick={() => setActiveType(null)}>
                    Back
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {step === "provider" && (
          <PaymentProviderStep
            selectedProvider={selectedProvider}
            cardNumber={cardNumber}
            cardExpiry={cardExpiry}
            cardCvc={cardCvc}
            simulateFailure={simulateFailure}
            onSelectProvider={setSelectedProvider}
            onCardNumberChange={setCardNumber}
            onCardExpiryChange={setCardExpiry}
            onCardCvcChange={setCardCvc}
            onSimulateFailureChange={setSimulateFailure}
            onPay={handlePay}
            onBack={() => setStep("amount")}
          />
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-neutral-100 border-t-black" />
            <p className="text-sm font-semibold text-black">Contacting {getProviderName(selectedProvider)}...</p>
            <p className="text-xs text-neutral-400 mt-1">Please secure your connection. Do not close this page.</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black">Payment Successful!</h3>
            <div className="my-4 w-full rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-left text-sm space-y-2 text-neutral-600">
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span className="font-semibold text-black">{formatAmount(selectedAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Method:</span>
                <span className="font-semibold text-black">{getProviderName(selectedProvider)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-semibold text-black">Settled</span>
              </div>
            </div>
            <Button onClick={handleClose}>Done</Button>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-black">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black font-semibold">Payment Declined</h3>
            <p className="text-xs text-neutral-500 max-w-xs mt-2 mb-6">
              Your bank or payment provider declined this transaction. Please try another card or check your provider settings.
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={() => { setStep("provider"); setError(""); }}>
                Try Again
              </Button>
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-600 text-center font-medium mt-1">{error}</p>}
      </div>
    </BottomSheet>
  );
}

