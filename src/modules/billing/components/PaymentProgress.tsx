type PaymentProgressProps = {
  total: number;
  paid: number;
};

export function PaymentProgress({ total, paid }: PaymentProgressProps) {
  const percentage = total > 0 ? Math.min(100, (paid / total) * 100) : 0;

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted sm:h-2">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-[11px] text-muted-foreground sm:text-xs">{percentage.toFixed(0)}% paid</p>
    </div>
  );
}
