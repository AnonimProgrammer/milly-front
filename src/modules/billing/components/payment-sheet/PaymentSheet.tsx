"use client";

import { useState } from "react";
import { BottomSheet } from "@/modules/shared/ui";
import { detectCardBrand, extractLast4, parseCardExpiry } from "../../api";
import type { PaymentIntent, PaymentResponse, PaymentResult } from "../../api";
import type { PaymentProvider, PaymentType, TipOption } from "../../types/payment";
import { PaymentAmountStep } from "./PaymentAmountStep";
import { PaymentErrorStep } from "./PaymentErrorStep";
import { PaymentProcessingStep } from "./PaymentProcessingStep";
import { PaymentProviderStep } from "./PaymentProviderStep";
import { PaymentReviewStep } from "./PaymentReviewStep";
import { PaymentSuccessStep } from "./PaymentSuccessStep";
import { calculateTipAmount, getSheetTitle } from "./paymentSheet.utils";
import type { PaymentStep } from "./types";

type PaymentSheetProps = {
  open: boolean;
  onClose: () => void;
  billTotal: number;
  remaining: number;
  onPay: (intent: PaymentIntent) => Promise<PaymentResult>;
};

const SIMULATED_FAILURE_MESSAGE =
  "Simulated failure enabled — this is a dev-only test path.";

export function PaymentSheet({ open, onClose, billTotal, remaining, onPay }: PaymentSheetProps) {
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
  const [payError, setPayError] = useState<string>("");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [tipOption, setTipOption] = useState<TipOption>("none");
  const [customTipAmount, setCustomTipAmount] = useState("");
  const [completedPayment, setCompletedPayment] = useState<PaymentResponse | null>(null);

  const tipAmount = calculateTipAmount(tipOption, selectedAmount, customTipAmount);

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
    setPayError("");
    setTipOption("none");
    setCustomTipAmount("");
    setCompletedPayment(null);
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

  function buildIntent(): PaymentIntent | null {
    if (!activeType || !selectedProvider) {
      return null;
    }

    const intent: PaymentIntent = {
      amount: Number(selectedAmount.toFixed(2)),
      type: activeType,
      provider: selectedProvider,
    };

    const resolvedTipAmount = calculateTipAmount(tipOption, selectedAmount, customTipAmount);
    if (resolvedTipAmount > 0) {
      intent.tipAmount = resolvedTipAmount;
    }

    if (selectedProvider === "card") {
      const { expiryMonth, expiryYear } = parseCardExpiry(cardExpiry);
      intent.card = {
        last4: extractLast4(cardNumber),
        brand: detectCardBrand(cardNumber),
        expiryMonth: expiryMonth ?? 0,
        expiryYear: expiryYear ?? 0,
      };
    }

    if (activeType === "split") {
      intent.splitPeople = Math.max(2, parseInt(splitPeople, 10) || 2);
    }

    return intent;
  }

  function handleContinueToReview() {
    if (!selectedProvider) return;
    if (selectedProvider === "card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      return;
    }
    setStep("review");
  }

  async function handlePay() {
    const intent = buildIntent();
    if (!intent) return;

    setStep("processing");
    setError("");
    setPayError("");

    if (simulateFailure) {
      setTimeout(() => {
        setPayError(SIMULATED_FAILURE_MESSAGE);
        setStep("error");
      }, 800);
      return;
    }

    const result = await onPay(intent);

    if (result.success) {
      setCompletedPayment(result.payment);
      setStep("success");
      return;
    }

    setPayError(result.errorMessage);
    setStep("error");
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
            onContinue={handleContinueToReview}
            onBack={() => setStep("amount")}
          />
        )}

        {step === "review" && selectedProvider && (
          <PaymentReviewStep
            billTotal={billTotal}
            amountToPay={selectedAmount}
            remainingAfterPayment={Math.max(0, remaining - selectedAmount)}
            tipAmount={tipAmount}
            tipOption={tipOption}
            customTipAmount={customTipAmount}
            provider={selectedProvider}
            onSelectTipOption={setTipOption}
            onCustomTipAmountChange={setCustomTipAmount}
            onConfirm={handlePay}
            onBack={() => setStep("provider")}
          />
        )}

        {step === "processing" && <PaymentProcessingStep provider={selectedProvider} />}

        {step === "success" && completedPayment && (
          <PaymentSuccessStep payment={completedPayment} onDone={handleClose} />
        )}

        {step === "error" && (
          <PaymentErrorStep
            message={payError}
            onTryAgain={() => {
              setStep("review");
              setError("");
              setPayError("");
            }}
            onCancel={handleClose}
          />
        )}

        {error && <p className="mt-1 text-center text-sm font-medium text-red-600">{error}</p>}
      </div>
    </BottomSheet>
  );
}
