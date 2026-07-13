import type { TableStatus } from "../types";

const sizeClasses = {
  sm: "rounded-full px-2.5 py-0.5 text-xs font-medium",
  md: "rounded-full px-3 py-1 text-sm font-medium",
} as const;

type TableStatusBadgeProps = {
  status: TableStatus;
  size?: keyof typeof sizeClasses;
};

export function TableStatusBadge({ status, size = "sm" }: TableStatusBadgeProps) {
  if (status === "active") {
    return (
      <span
        className={`${sizeClasses[size]} border border-green-200/80 bg-green-100 text-green-800 dark:border-green-800/50 dark:bg-green-900/30 dark:text-green-400`}
      >
        Active
      </span>
    );
  }

  return (
    <span className={`${sizeClasses[size]} bg-muted text-muted-foreground`}>
      Inactive
    </span>
  );
}
