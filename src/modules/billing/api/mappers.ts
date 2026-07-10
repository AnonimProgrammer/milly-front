import type { PaymentProvider, PaymentType } from "../types/payment";
import type {
  ApiPaymentProvider,
  ApiPaymentType,
  CreatePaymentRequest,
  PaymentIntent,
} from "./types";

const PROVIDER_TO_API: Record<PaymentProvider, ApiPaymentProvider> = {
  card: "CARD",
  "apple-pay": "APPLE",
  "google-pay": "GOOGLE",
};

const TYPE_TO_API: Record<PaymentType, ApiPaymentType> = {
  full: "FULL",
  custom: "CUSTOM",
  split: "SPLIT",
};

/**
 * Very rough BIN → brand guess. Real card networks need proper BIN tables, but
 * this is a mock payment flow — the backend only requires a non-blank brand.
 */
export function detectCardBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");

  if (digits.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (digits.startsWith("6")) return "discover";

  return "card";
}

export function extractLast4(cardNumber: string): string {
  return cardNumber.replace(/\D/g, "").slice(-4);
}

/**
 * Parses "MM/YY" or "MM/YYYY" into a 4-digit year + numeric month.
 * Returns null values when parsing fails so the caller can decide whether to
 * omit the field or surface a validation error.
 */
export function parseCardExpiry(expiry: string): {
  expiryMonth: number | null;
  expiryYear: number | null;
} {
  const [rawMonth, rawYear] = expiry.split("/").map((part) => part.trim());
  const month = Number.parseInt(rawMonth ?? "", 10);
  const yearRaw = Number.parseInt(rawYear ?? "", 10);

  if (!Number.isFinite(month) || month < 1 || month > 12) {
    return { expiryMonth: null, expiryYear: null };
  }

  if (!Number.isFinite(yearRaw)) {
    return { expiryMonth: month, expiryYear: null };
  }

  const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
  return { expiryMonth: month, expiryYear: year };
}

export function toCreatePaymentRequest(intent: PaymentIntent): CreatePaymentRequest {
  const request: CreatePaymentRequest = {
    amount: intent.amount,
    paymentType: TYPE_TO_API[intent.type],
    provider: PROVIDER_TO_API[intent.provider],
  };

  if (intent.card) {
    request.providerDetails = intent.card;
  }

  if (intent.splitPeople !== undefined) {
    request.splitPeople = intent.splitPeople;
  }

  if (intent.tipAmount !== undefined && intent.tipAmount > 0) {
    request.tipAmount = intent.tipAmount;
  }

  return request;
}
