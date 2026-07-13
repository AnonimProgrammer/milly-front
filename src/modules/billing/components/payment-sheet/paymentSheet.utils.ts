import { formatAmount } from "@/modules/orders";
import type { PaymentProvider, TipOption } from "../../types/payment";
import type { ApiPaymentProvider } from "../../api/types";
import type { PaymentStep } from "./types";

export function calculateTipAmount(
  option: TipOption,
  billAmount: number,
  customTipInput: string,
): number {
  if (option === "none") {
    return 0;
  }

  if (option === "custom") {
    const parsed = Number.parseFloat(customTipInput);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return 0;
    }
    return Math.min(Number(parsed.toFixed(2)), billAmount);
  }

  const percentage = Number.parseInt(option, 10) / 100;
  return Number((billAmount * percentage).toFixed(2));
}

export function isCustomTipValid(customTipInput: string, billAmount: number): boolean {
  const parsed = Number.parseFloat(customTipInput);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= billAmount;
}

export function getProviderName(provider: PaymentProvider | null): string {
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
}

export function getApiProviderName(provider: ApiPaymentProvider): string {
  switch (provider) {
    case "APPLE":
      return "Apple Pay";
    case "GOOGLE":
      return "Google Pay";
    case "CARD":
      return "Credit Card";
  }
}


export function formatPaymentDateTime(createdAt: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(createdAt));
}

export function getSheetTitle(step: PaymentStep, selectedAmount: number): string {
  if (step === "amount") return "Pay the bill";
  if (step === "provider") return `Pay ${formatAmount(selectedAmount)}`;
  if (step === "review") return "Review payment";
  if (step === "processing") return "Processing Payment";
  if (step === "success") return "Payment Successful";
  if (step === "error") return "Payment Failed";
  return "";
}
