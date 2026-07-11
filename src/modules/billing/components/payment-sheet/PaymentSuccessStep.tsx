import { Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentResponse } from "../../api/types";
import { formatPaymentDateTime, getApiProviderName } from "./paymentSheet.utils";

type PaymentSuccessStepProps = {
  payment: PaymentResponse;
  onDone: () => void;
};

export function PaymentSuccessStep({ payment, onDone }: PaymentSuccessStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
      <h3 className="text-lg font-bold text-foreground">Payment Successful!</h3>

      <div className="my-4 w-full space-y-3 rounded-xl border border-border bg-muted p-4 text-left">
        <h4 className="text-sm font-semibold text-foreground">Digital Receipt</h4>
        <dl className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between gap-4">
            <dt>Paid amount</dt>
            <dd className="font-semibold text-foreground">{formatAmount(payment.amount)}</dd>
          </div>
          {payment.tipAmount > 0 && (
            <div className="flex justify-between gap-4">
              <dt>Tip amount</dt>
              <dd className="font-semibold text-foreground">{formatAmount(payment.tipAmount)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt>Date &amp; time</dt>
            <dd className="font-semibold text-foreground">{formatPaymentDateTime(payment.createdAt)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Payment reference</dt>
            <dd className="font-semibold text-foreground">{payment.providerReference}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt>Method</dt>
            <dd className="font-semibold text-foreground">{getApiProviderName(payment.provider)}</dd>
          </div>
        </dl>
      </div>

      <Button onClick={onDone}>Done</Button>
    </div>
  );
}
