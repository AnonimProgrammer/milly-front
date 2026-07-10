type MillyBrandProps = {
  className?: string;
};

export function MillyBrand({ className = "" }: MillyBrandProps) {
  return (
    <span className={`text-lg font-semibold tracking-tight text-foreground sm:text-xl ${className}`}>
      milly.
    </span>
  );
}
