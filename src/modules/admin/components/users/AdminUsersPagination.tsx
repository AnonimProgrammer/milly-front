"use client";

import { primaryButton, secondaryButton } from "@/modules/shared/theme/classNames";
import type { PaginationMeta } from "../../api/types";

type AdminUsersPaginationProps = {
  pagination: PaginationMeta;
  isRefreshing: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function AdminUsersPagination({
  pagination,
  isRefreshing,
  onPrevious,
  onNext,
}: AdminUsersPaginationProps) {
  if (!pagination.hasPrevious && !pagination.hasNext) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!pagination.hasPrevious || isRefreshing}
        className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium ${secondaryButton}`}
      >
        Previous
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={!pagination.hasNext || isRefreshing}
        className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium ${primaryButton}`}
      >
        Next
      </button>
    </div>
  );
}
