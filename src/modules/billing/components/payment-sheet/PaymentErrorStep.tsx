import { Button } from "@/modules/shared/ui";

type PaymentErrorStepProps = {
  message?: string;
  onTryAgain: () => void;
  onCancel: () => void;
};

const DEFAULT_ERROR_MESSAGE =
  "Your bank or payment provider declined this transaction. Please try another card or check your provider settings.";

export function PaymentErrorStep({ message, onTryAgain, onCancel }: PaymentErrorStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-foreground">Payment Declined</h3>
      <p className="mt-2 mb-6 max-w-xs text-xs text-muted-foreground">
        {message ?? DEFAULT_ERROR_MESSAGE}
      </p>
      <div className="flex w-full flex-col gap-2">
        <Button onClick={onTryAgain}>Try Again</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
