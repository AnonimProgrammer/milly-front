type PaymentProviderButtonProps = {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  fullWidth?: boolean;
};

export function PaymentProviderButton({
  selected,
  onClick,
  icon,
  label,
  fullWidth = false,
}: PaymentProviderButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-center rounded-xl py-3 text-sm font-medium transition-all ${
        fullWidth ? "w-full" : ""
      } ${
        selected
          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-card"
          : "border border-border bg-muted text-foreground hover:bg-accent"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
