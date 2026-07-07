"use client";

import { useState } from "react";
import { BottomSheet, Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentType, PaymentProvider } from "../types/payment";


type PaymentSheetProps = {
  open: boolean;
  onClose: () => void;
  remaining: number;
  onPay: (amount: number, type: PaymentType) => boolean;
};

type PaymentStep = "amount" | "provider" | "processing" | "success" | "error";

const AppleIcon = () => (
  <svg className="mr-2 h-4 w-4 fill-current text-white" viewBox="0 0 170 170">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.92-14.38-6.17-3.35-2.74-7.24-7.46-11.69-14.15-8.49-12.87-14.81-28.72-18.96-47.53-2.91-13.2-4.36-25.13-4.36-35.79 0-15.7 3.73-28.32 11.2-37.88 7.47-9.56 16.73-14.37 27.77-14.43 5.41 0 10.98 1.44 16.69 4.31 5.71 2.87 9.38 4.31 10.99 4.31 1.73 0 5.66-1.57 11.78-4.71 6.13-3.14 11.89-4.63 17.29-4.49 13.62.48 24.3 5.56 32.06 15.22-12.43 7.55-18.52 17.6-18.28 30.13.25 9.87 3.93 18.06 11.04 24.58 7.12 6.52 15.61 9.94 25.48 10.25-2.58 7.63-5.75 14.83-9.5 21.61zM119.22 35.63c0-8.32 2.92-15.77 8.76-21.36 5.84-5.59 12.85-8.62 21.03-9.08.1 1.02.16 1.94.16 2.76 0 8.01-2.97 15.35-8.91 21.01-5.94 5.66-13.06 8.78-21.37 9.37-.11-1.02-.17-1.92-.17-2.7z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.67-.35-1.37-.35-2.09z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const CardIcon = () => (
  <svg
    className="mr-2 h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

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

  const getSheetTitle = () => {
    if (step === "amount") return "Pay the bill";
    if (step === "provider") return `Pay ${formatAmount(selectedAmount)}`;
    if (step === "processing") return "Processing Payment";
    if (step === "success") return "Payment Successful";
    if (step === "error") return "Payment Failed";
    return "";
  };

  return (
    <BottomSheet open={open} onClose={handleClose} title={getSheetTitle()}>
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
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Select Payment Method</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedProvider("apple-pay")}
                className={`flex items-center justify-center rounded-xl py-3 text-sm font-medium transition-all ${
                  selectedProvider === "apple-pay"
                    ? "bg-black text-white ring-2 ring-black ring-offset-2"
                    : "border border-neutral-200 bg-neutral-50 text-black hover:bg-neutral-100"
                }`}
              >
                <AppleIcon />
                <span>Apple Pay</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedProvider("google-pay")}
                className={`flex items-center justify-center rounded-xl py-3 text-sm font-medium transition-all ${
                  selectedProvider === "google-pay"
                    ? "bg-black text-white ring-2 ring-black ring-offset-2"
                    : "border border-neutral-200 bg-neutral-50 text-black hover:bg-neutral-100"
                }`}
              >
                <GoogleIcon />
                <span>Google Pay</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProvider("card")}
              className={`flex w-full items-center justify-center rounded-xl py-3 text-sm font-medium transition-all ${
                selectedProvider === "card"
                  ? "bg-black text-white ring-2 ring-black ring-offset-2"
                  : "border border-neutral-200 bg-neutral-50 text-black hover:bg-neutral-100"
              }`}
            >
              <CardIcon />
              <span>Credit or Debit Card</span>
            </button>

            {selectedProvider === "card" && (
              <div className="space-y-2 rounded-xl border border-neutral-200/60 bg-neutral-50 p-4 transition-all duration-300">
                <div>
                  <label className="mb-1 block text-xs font-medium text-neutral-500">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="•••• •••• •••• ••••"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-black outline-none focus:border-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-neutral-500">Expiry Date</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-black outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-neutral-500">CVC</label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-black outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-400">
              <span>Simulate payment failure (for testing)</span>
              <button
                type="button"
                onClick={() => setSimulateFailure(!simulateFailure)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  simulateFailure ? "bg-black" : "bg-neutral-200"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    simulateFailure ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={handlePay}
                disabled={
                  !selectedProvider ||
                  (selectedProvider === "card" && (!cardNumber || !cardExpiry || !cardCvc))
                }
              >
                {selectedProvider === "apple-pay" && "Pay with Apple Pay"}
                {selectedProvider === "google-pay" && "Pay with Google Pay"}
                {selectedProvider === "card" && "Pay with Card"}
                {!selectedProvider && "Select a payment option"}
              </Button>
              <Button variant="ghost" onClick={() => setStep("amount")}>
                Back
              </Button>
            </div>
          </div>
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

