import { Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import { inputField } from "@/modules/shared/theme/classNames";
import type { TipOption } from "../../types/payment";

const TIP_OPTIONS: { value: TipOption; label: string }[] = [
  { value: "none", label: "No Tip" },
  { value: "5", label: "5%" },
  { value: "10", label: "10%" },
  { value: "15", label: "15%" },
  { value: "custom", label: "Custom" },
];

type PaymentTipSelectorProps = {
  billAmount: number;
  selectedOption: TipOption;
  customTipAmount: string;
  onSelectOption: (option: TipOption) => void;
  onCustomTipAmountChange: (value: string) => void;
};

export function PaymentTipSelector({
  billAmount,
  selectedOption,
  customTipAmount,
  onSelectOption,
  onCustomTipAmountChange,
}: PaymentTipSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">Add a tip (optional)</p>
      <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TIP_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={selectedOption === option.value ? "primary" : "secondary"}
            className="!w-auto shrink-0 snap-start px-4"
            onClick={() => onSelectOption(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {selectedOption === "custom" && (
        <div className="space-y-1">
          <label className="block text-sm text-muted-foreground">
            Custom tip (max {formatAmount(billAmount)})
          </label>
          <input
            type="number"
            min="0"
            max={billAmount}
            step="0.01"
            value={customTipAmount}
            onChange={(event) => onCustomTipAmountChange(event.target.value)}
            className={inputField}
            placeholder="0.00"
          />
        </div>
      )}
    </div>
  );
}
