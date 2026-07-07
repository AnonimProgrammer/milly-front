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
          ? "bg-black text-white ring-2 ring-black ring-offset-2"
          : "border border-neutral-200 bg-neutral-50 text-black hover:bg-neutral-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
