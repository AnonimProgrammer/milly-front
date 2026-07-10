import { formatAmount } from "@/modules/orders";
import type { PaymentProvider } from "../../types/payment";
import type { PaymentStep } from "./types";

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

export function getSheetTitle(step: PaymentStep, selectedAmount: number): string {
  if (step === "amount") return "Pay the bill";
  if (step === "provider") return `Pay ${formatAmount(selectedAmount)}`;
  if (step === "review") return "Review payment";
  if (step === "processing") return "Processing Payment";
  if (step === "success") return "Payment Successful";
  if (step === "error") return "Payment Failed";
  return "";
}

export function getPayButtonLabel(provider: PaymentProvider | null): string {
  if (provider === "apple-pay") return "Pay with Apple Pay";
  if (provider === "google-pay") return "Pay with Google Pay";
  if (provider === "card") return "Pay with Card";
  return "Select a payment option";
}
