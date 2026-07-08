import { apiRequest, ApiError } from "@/modules/shared/api";
import { toCreatePaymentRequest } from "./mappers";
import type {
  BillSummaryResponse,
  PaymentIntent,
  PaymentResult,
  ProcessPaymentResponse,
} from "./types";

function paymentsPath(tableId: string, orderId: string): string {
  return `/api/v1/public/tables/${tableId}/orders/${orderId}/payments`;
}

function billPath(tableId: string, orderId: string): string {
  return `/api/v1/public/tables/${tableId}/orders/${orderId}/bill`;
}

export async function getBill(tableId: string, orderId: string): Promise<BillSummaryResponse> {
  return apiRequest<BillSummaryResponse>(billPath(tableId, orderId), {
    background: true,
    silent: true,
  });
}

/**
 * Processes a payment attempt through the mock billing API. Validation errors
 * (order not approved, amount mismatch, invalid card details, ...) come back
 * as HTTP 422 and are converted to a structured {@link PaymentResult} so the
 * payment sheet can render an inline error state instead of a toast.
 * Idempotency keys are generated per attempt to guard against retries.
 */
export async function processPayment(
  tableId: string,
  orderId: string,
  intent: PaymentIntent,
): Promise<PaymentResult> {
  const body = toCreatePaymentRequest(intent);
  const idempotencyKey = crypto.randomUUID();

  try {
    const response = await apiRequest<ProcessPaymentResponse>(
      paymentsPath(tableId, orderId),
      {
        method: "POST",
        body,
        headers: { "X-Idempotency-Key": idempotencyKey },
        silent: true,
      },
    );

    return { success: true, bill: response.bill, payment: response.payment };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, errorMessage: error.message };
    }

    return {
      success: false,
      errorMessage: "Unable to reach the payment service. Please try again.",
    };
  }
}
