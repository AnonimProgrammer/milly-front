import { Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentProvider, TipOption } from "../../types/payment";
import { PaymentReviewSummary } from "./PaymentReviewSummary";
import { PaymentTipSelector } from "./PaymentTipSelector";
import { getProviderName, isCustomTipValid } from "./paymentSheet.utils";

type PaymentReviewStepProps = {
  billTotal: number;
  amountToPay: number;
  remainingAfterPayment: number;
  tipAmount: number;
  tipOption: TipOption;
  customTipAmount: string;
  provider: PaymentProvider;
  onSelectTipOption: (option: TipOption) => void;
  onCustomTipAmountChange: (value: string) => void;
  onConfirm: () => void;
  onBack: () => void;
};

export function PaymentReviewStep({
  billTotal,
  amountToPay,
  remainingAfterPayment,
  tipAmount,
  tipOption,
  customTipAmount,
  provider,
  onSelectTipOption,
  onCustomTipAmountChange,
  onConfirm,
  onBack,
}: PaymentReviewStepProps) {
  const totalCharge = Number((amountToPay + tipAmount).toFixed(2));
  const customTipInvalid = tipOption === "custom" && !isCustomTipValid(customTipAmount, amountToPay);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Review your payment details before confirming. This helps prevent accidental overpayments.
      </p>

      <PaymentTipSelector
        billAmount={amountToPay}
        selectedOption={tipOption}
        customTipAmount={customTipAmount}
        onSelectOption={onSelectTipOption}
        onCustomTipAmountChange={onCustomTipAmountChange}
      />

      <PaymentReviewSummary
        billTotal={billTotal}
        amountToPay={amountToPay}
        remainingAfterPayment={remainingAfterPayment}
        tipAmount={tipAmount}
      />

      <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm">
        <span className="text-muted-foreground">Payment method</span>
        <span className="font-semibold text-foreground">{getProviderName(provider)}</span>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={onConfirm} disabled={customTipInvalid}>
          Confirm &amp; pay {formatAmount(totalCharge)}
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
