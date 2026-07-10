import { Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import { inputField } from "@/modules/shared/theme/classNames";
import type { PaymentType } from "../../types/payment";

type PaymentAmountStepProps = {
  remaining: number;
  activeType: PaymentType | null;
  customAmount: string;
  splitPeople: string;
  onSelectAmountType: (type: PaymentType) => void;
  onCustomAmountChange: (value: string) => void;
  onSplitPeopleChange: (value: string) => void;
  onCustomAmountSubmit: () => void;
  onSplitAmountSubmit: () => void;
  onBack: () => void;
};

export function PaymentAmountStep({
  remaining,
  activeType,
  customAmount,
  splitPeople,
  onSelectAmountType,
  onCustomAmountChange,
  onSplitPeopleChange,
  onCustomAmountSubmit,
  onSplitAmountSubmit,
  onBack,
}: PaymentAmountStepProps) {
  if (!activeType) {
    return (
      <>
        <Button onClick={() => onSelectAmountType("full")}>
          Full amount — {formatAmount(remaining)}
        </Button>
        <Button variant="secondary" onClick={() => onSelectAmountType("custom")}>
          Custom amount
        </Button>
        <Button variant="secondary" onClick={() => onSelectAmountType("split")}>
          Split the bill
        </Button>
      </>
    );
  }

  if (activeType === "custom") {
    return (
      <div className="space-y-3">
        <label className="block text-sm text-muted-foreground">
          Amount to pay (max {formatAmount(remaining)})
        </label>
        <input
          type="number"
          min="0.01"
          max={remaining}
          step="0.01"
          value={customAmount}
          onChange={(event) => onCustomAmountChange(event.target.value)}
          className={inputField}
          placeholder="0.00"
        />
        <div className="flex flex-col gap-2 pt-2">
          <Button
            onClick={onCustomAmountSubmit}
            disabled={!customAmount || parseFloat(customAmount) <= 0}
          >
            Continue
          </Button>
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted-foreground">Number of people splitting</label>
      <input
        type="number"
        min="2"
        value={splitPeople}
        onChange={(event) => onSplitPeopleChange(event.target.value)}
        className={inputField}
      />
      <p className="text-sm font-medium text-muted-foreground">
        Your share:{" "}
        {formatAmount(remaining / Math.max(2, parseInt(splitPeople, 10) || 2))}
      </p>
      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={onSplitAmountSubmit}>Continue</Button>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
