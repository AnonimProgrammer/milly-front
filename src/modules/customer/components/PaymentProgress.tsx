type PaymentProgressProps = {
  total: number;
  paid: number;
};

export function PaymentProgress({ total, paid }: PaymentProgressProps) {
  const percentage = total > 0 ? Math.min(100, (paid / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-black transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-neutral-500">{percentage.toFixed(0)}% paid</p>
    </div>
  );
}
