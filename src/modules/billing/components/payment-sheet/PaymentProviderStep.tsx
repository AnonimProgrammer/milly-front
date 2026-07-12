import { Button } from "@/modules/shared/ui";
import type { PaymentProvider } from "../../types/payment";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentProviderButton } from "./PaymentProviderButton";
import { ApplePayIcon, CardIcon, GooglePayIcon } from "./PaymentProviderIcons";

type PaymentProviderStepProps = {
  selectedProvider: PaymentProvider | null;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  onSelectProvider: (provider: PaymentProvider) => void;
  onCardNumberChange: (value: string) => void;
  onCardExpiryChange: (value: string) => void;
  onCardCvcChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function PaymentProviderStep({
  selectedProvider,
  cardNumber,
  cardExpiry,
  cardCvc,
  onSelectProvider,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
  onContinue,
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

      <div className="flex flex-col gap-2 pt-2">
        <Button onClick={onContinue} disabled={!selectedProvider || cardIncomplete}>
          Review payment
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    </div>
  );
}
