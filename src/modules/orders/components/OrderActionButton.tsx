type OrderActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function OrderActionButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: OrderActionButtonProps) {
  const base =
    "w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer disabled:opacity-40";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary: "border border-border bg-card text-foreground hover:bg-muted",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
