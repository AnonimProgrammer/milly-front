import { spinnerRing } from "@/modules/shared/theme/classNames";

export function StaffPageLoading() {
  return (
    <div
      className="flex flex-1 items-center justify-center py-24"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className={`h-10 w-10 ${spinnerRing}`} />
    </div>
  );
}
