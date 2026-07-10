import { formatAmount } from "@/modules/orders";

type PaymentReviewSummaryProps = {
  billTotal: number;
  amountToPay: number;
  remainingAfterPayment: number;
};

export function PaymentReviewSummary({
  billTotal,
  amountToPay,
  remainingAfterPayment,
}: PaymentReviewSummaryProps) {
  return (
    <div className="space-y-3 rounded-xl border border-border bg-muted p-4 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Bill total</span>
        <span className="font-semibold text-foreground">{formatAmount(billTotal)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Amount to pay</span>
        <span className="font-semibold text-foreground">{formatAmount(amountToPay)}</span>
      </div>
      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">Remaining after payment</span>
          <span className="text-base font-bold text-foreground">
            {formatAmount(remainingAfterPayment)}
          </span>
        </div>
        {remainingAfterPayment === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">This payment will settle the full bill.</p>
        )}
      </div>
    </div>
  );
}
