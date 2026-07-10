type MillyMarkProps = {
  className?: string;
  size?: number;
};

export function MillyMark({ className = "h-16 w-16", size }: MillyMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" fill="transparent" />
      <circle cx="14" cy="14" r="8" fill="#1e3a8a" />
      <circle cx="18" cy="18" r="8" fill="#000000" fillOpacity="0.85" />
    </svg>
  );
}
