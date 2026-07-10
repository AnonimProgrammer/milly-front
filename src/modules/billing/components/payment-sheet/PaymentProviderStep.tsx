import { Button } from "@/modules/shared/ui";
import type { PaymentProvider } from "../../types/payment";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentProviderButton } from "./PaymentProviderButton";
import { ApplePayIcon, CardIcon, GooglePayIcon } from "./PaymentProviderIcons";
import { getPayButtonLabel } from "./paymentSheet.utils";

type PaymentProviderStepProps = {
  selectedProvider: PaymentProvider | null;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  simulateFailure: boolean;
  onSelectProvider: (provider: PaymentProvider) => void;
  onCardNumberChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvcChange: (value: string) => void;
  onSimulateFailureChange: (value: boolean) => void;
  onPay: () => void;
  onBack: () => void;
};

export function PaymentProviderStep({
  selectedProvider,
  cardNumber,
  cardExpiry,
  cardCvc,
  simulateFailure,
  onSelectProvider,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
  onSimulateFailureChange,
  onPay,
  onBack,
}: PaymentProviderStepProps) {
  const cardIncomplete =
    selectedProvider === "card" && (!cardNumber || !cardExpiry || !cardCvc);

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Select Payment Method
      </p>
      <div className="grid grid-cols-2 gap-2">
        <PaymentProviderButton
          selected={selectedProvider === "apple-pay"}
          onClick={() => onSelectProvider("apple-pay")}
          icon={<ApplePayIcon />}
          label="Apple Pay"
        />
        <PaymentProviderButton
          selected={selectedProvider === "google-pay"}
          onClick={() => onSelectProvider("google-pay")}
          icon={<GooglePayIcon />}
          label="Google Pay"
        />
      </div>

      <PaymentProviderButton
        selected={selectedProvider === "card"}
        onClick={() => onSelectProvider("card")}
        icon={<CardIcon />}
        label="Credit or Debit Card"
        fullWidth
      />

      {selectedProvider === "card" && (
        <CreditCardForm
          cardNumber={cardNumber}
          cardExpiry={cardExpiry}
          cardCvc={cardCvc}
          onCardNumberChange={onCardNumberChange}
          onCardExpiryChange={onCardExpiryChange}
          onCardCvcChange={onCardCvcChange}
        />
      )}

      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span>Simulate payment failure (for testing)</span>
        <button
          type="button"
          onClick={() => onSimulateFailureChange(!simulateFailure)}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            simulateFailure ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-primary-foreground shadow ring-0 transition duration-200 ease-in-out ${
              simulateFailure ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={onPay} disabled={!selectedProvider || cardIncomplete}>
          {getPayButtonLabel(selectedProvider)}
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
