import type { PaymentProvider, PaymentType } from "../types/payment";

/**
 * Backend enum values from `com.milly.billing.domain.valueobject.*`.
 * Jackson accepts case-insensitive JSON but we send uppercase to match the
 * canonical constants for clarity in logs.
 */
export type ApiPaymentProvider = "CARD" | "APPLE" | "GOOGLE";
export type ApiPaymentType = "FULL" | "CUSTOM" | "SPLIT";
export type ApiPaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type ProviderDetailsRequest = {
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
};

export type CreatePaymentRequest = {
  amount: number;
  paymentType: ApiPaymentType;
  provider: ApiPaymentProvider;
  providerDetails?: ProviderDetailsRequest;
  splitPeople?: number;
  tipAmount?: number;
};

export type PaymentResponse = {
  id: string;
  amount: number;
  tipAmount: number;
  status: ApiPaymentStatus;
  provider: ApiPaymentProvider;
  paymentType: ApiPaymentType;
  providerReference: string;
  providerMetadata: Record<string, unknown> | null;
  createdAt: string;
  receiptUrl: string | null;
};

export type BillSummaryResponse = {
  orderTotal: number;
  paidAmount: number;
  remaining: number;
  fullyPaid: boolean;
  totalTipAmount: number;
  payments: PaymentResponse[];
};

export type ProcessPaymentResponse = {
  payment: PaymentResponse;
  bill: BillSummaryResponse;
};

/**
 * Client-side payment intent produced by the payment sheet UI. Uses the
 * frontend's kebab-case flavour of PaymentType/PaymentProvider and gets mapped
 * to {@link CreatePaymentRequest} before hitting the API.
 */
export type PaymentIntent = {
  amount: number;
  tipAmount?: number;
  type: PaymentType;
  provider: PaymentProvider;
  card?: {
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
  };
  splitPeople?: number;
};

export type PaymentResult =
  | { success: true; bill: BillSummaryResponse; payment: PaymentResponse }
  | { success: false; errorMessage: string };
