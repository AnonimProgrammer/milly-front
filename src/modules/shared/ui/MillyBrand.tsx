type MillyBrandProps = {
  className?: string;
};

export function MillyBrand({ className = "" }: MillyBrandProps) {
  return (
    <span className={`text-lg font-semibold tracking-tight text-black dark:text-zinc-100 sm:text-xl ${className}`}>
      milly.
    </span>
  );
}
