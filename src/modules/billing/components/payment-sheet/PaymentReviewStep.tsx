import { Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentProvider } from "../../types/payment";
import { PaymentReviewSummary } from "./PaymentReviewSummary";
import { getProviderName } from "./paymentSheet.utils";

type PaymentReviewStepProps = {
  billTotal: number;
  amountToPay: number;
  remainingAfterPayment: number;
  provider: PaymentProvider;
  onConfirm: () => void;
  onBack: () => void;
};

export function PaymentReviewStep({
  billTotal,
  amountToPay,
  remainingAfterPayment,
  provider,
  onConfirm,
  onBack,
}: PaymentReviewStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Review your payment details before confirming. This helps prevent accidental overpayments.
      </p>

      <PaymentReviewSummary
        billTotal={billTotal}
        amountToPay={amountToPay}
        remainingAfterPayment={remainingAfterPayment}
      />

      <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
        <span className="text-muted-foreground">Payment method</span>
        <span className="font-semibold text-foreground">{getProviderName(provider)}</span>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={onConfirm}>Confirm &amp; pay {formatAmount(amountToPay)}</Button>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
