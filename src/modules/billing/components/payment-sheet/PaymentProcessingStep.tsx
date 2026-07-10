import { formatAmount } from "@/modules/orders";
import { spinnerRing } from "@/modules/shared/theme/classNames";
import type { PaymentProvider } from "../../types/payment";
import { getProviderName } from "./paymentSheet.utils";

type PaymentProcessingStepProps = {
  provider: PaymentProvider | null;
};

export function PaymentProcessingStep({ provider }: PaymentProcessingStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className={`mb-4 h-12 w-12 ${spinnerRing}`} />
      <p className="text-sm font-semibold text-foreground">
        Contacting {getProviderName(provider)}...
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Please secure your connection. Do not close this page.
      </p>
    </div>
  );
}
