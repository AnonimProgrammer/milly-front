import type { ReactNode } from "react";

type PageHeaderProps = {
  leading?: ReactNode;
  center?: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function PageHeader({ leading, center, trailing, className }: PageHeaderProps) {
  return (
    <header
      className={`relative z-10 mx-auto flex w-full max-w-7xl items-start justify-between gap-2 py-1.5 sm:gap-4 sm:py-2 ${className ?? ""}`}
    >
      <div className="min-w-0 shrink">{leading ?? <span className="sr-only">Navigation</span>}</div>
      <div className="flex min-w-0 flex-1 justify-center">{center}</div>
      <div className="flex shrink-0 justify-end overflow-visible">{trailing}</div>
    </header>
  );
}
