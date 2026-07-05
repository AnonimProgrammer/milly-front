type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "h-auto shrink-0 w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors disabled:opacity-40";
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "border border-black text-black hover:bg-neutral-100",
    ghost: "text-black hover:bg-neutral-100",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
