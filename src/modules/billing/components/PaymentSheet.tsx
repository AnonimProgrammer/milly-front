"use client";

import { useState } from "react";
import { BottomSheet } from "@/modules/shared/ui";
import type { PaymentType, PaymentProvider } from "../types/payment";
import { PaymentAmountStep } from "./payment-sheet/PaymentAmountStep";
import { PaymentErrorStep } from "./payment-sheet/PaymentErrorStep";
import { PaymentProcessingStep } from "./payment-sheet/PaymentProcessingStep";
import { PaymentProviderStep } from "./payment-sheet/PaymentProviderStep";
import { PaymentSuccessStep } from "./payment-sheet/PaymentSuccessStep";
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

        {error && <p className="text-sm text-red-600 text-center font-medium mt-1">{error}</p>}
      </div>
    </BottomSheet>
  );
}

