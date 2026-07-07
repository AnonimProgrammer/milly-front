import { Button } from "@/modules/shared/ui";
import { formatAmount } from "@/modules/orders";
import type { PaymentProvider } from "../../types/payment";
import { getProviderName } from "./paymentSheet.utils";

type PaymentSuccessStepProps = {
  amount: number;
  provider: PaymentProvider | null;
  onDone: () => void;
};

export function PaymentSuccessStep({ amount, provider, onDone }: PaymentSuccessStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
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
      <h3 className="text-lg font-bold text-black">Payment Successful!</h3>
      <div className="my-4 w-full space-y-2 rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-left text-sm text-neutral-600">
        <div className="flex justify-between">
          <span>Amount Paid:</span>
          <span className="font-semibold text-black">{formatAmount(amount)}</span>
        </div>
        <div className="flex justify-between">
          <span>Method:</span>
          <span className="font-semibold text-black">{getProviderName(provider)}</span>
        </div>
        <div className="flex justify-between">
          <span>Status:</span>
          <span className="font-semibold text-black">Settled</span>
        </div>
      </div>
      <Button onClick={onDone}>Done</Button>
    </div>
  );
}
