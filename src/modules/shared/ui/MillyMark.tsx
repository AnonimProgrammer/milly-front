import { SquareStack } from "lucide-react";

type MillyMarkProps = {
  className?: string;
  size?: number;
};

export function MillyMark({ className = "h-16 w-16", size }: MillyMarkProps) {
  return (
    <SquareStack
      className={`text-foreground ${className}`}
      size={size}
      aria-hidden="true"
    />
  );
}
