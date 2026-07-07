"use client";

import { useState } from "react";
import { BottomSheet } from "@/modules/shared/ui";
import type { PaymentType, PaymentProvider } from "../../types/payment";
import { PaymentAmountStep } from "./PaymentAmountStep";
import { PaymentErrorStep } from "./PaymentErrorStep";
import { PaymentProcessingStep } from "./PaymentProcessingStep";
import { PaymentProviderStep } from "./PaymentProviderStep";
import { PaymentSuccessStep } from "./PaymentSuccessStep";
import { getSheetTitle } from "./paymentSheet.utils";
import type { PaymentStep } from "./types";

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
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [error, setError] = useState("");
  const [simulateFailure, setSimulateFailure] = useState(false);

  function resetState() {
    setStep("amount");
    setActiveType(null);
    setCustomAmount("");
    setSelectedAmount(0);
    setSelectedProvider(null);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setError("");
  }

  function handleClose() {
    resetState();
    onClose();
  }

  function handleSelectAmountType(type: PaymentType) {
    if (type === "full") {
      setSelectedAmount(remaining);
      setActiveType("full");
      setStep("provider");
      return;
    }
    setActiveType(type);
  }

  function handleCustomAmountSubmit() {
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0 || amount > remaining) {
      setError("Invalid payment amount");
      return;
    }
    setError("");
    setSelectedAmount(amount);
    setStep("provider");
  }

  function handleSplitAmountSubmit() {
    const people = Math.max(2, parseInt(splitPeople, 10) || 2);
    setSelectedAmount(remaining / people);
    setStep("provider");
  }

  function handlePay() {
    if (!activeType || !selectedProvider) return;

    setStep("processing");
    setError("");

    setTimeout(() => {
      if (simulateFailure) {
        setStep("error");
        return;
      }

      const success = onPay(selectedAmount, activeType);
      setStep(success ? "success" : "error");
    }, 1500);
  }

  return (
    <BottomSheet open={open} onClose={handleClose} title={getSheetTitle(step, selectedAmount)}>
      <div className="flex flex-col gap-3">
        {step === "amount" && (
          <PaymentAmountStep
            remaining={remaining}
            activeType={activeType}
            customAmount={customAmount}
            splitPeople={splitPeople}
            onSelectAmountType={handleSelectAmountType}
            onCustomAmountChange={setCustomAmount}
            onSplitPeopleChange={setSplitPeople}
            onCustomAmountSubmit={handleCustomAmountSubmit}
            onSplitAmountSubmit={handleSplitAmountSubmit}
            onBack={() => setActiveType(null)}
          />
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

        {step === "processing" && <PaymentProcessingStep provider={selectedProvider} />}

        {step === "success" && (
          <PaymentSuccessStep
            amount={selectedAmount}
            provider={selectedProvider}
            onDone={handleClose}
          />
        )}

        {step === "error" && (
          <PaymentErrorStep
            onTryAgain={() => {
              setStep("provider");
              setError("");
            }}
            onCancel={handleClose}
          />
        )}

        {error && <p className="mt-1 text-center text-sm font-medium text-red-600">{error}</p>}
      </div>
    </BottomSheet>
  );
}
