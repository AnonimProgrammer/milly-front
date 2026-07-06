export function StaffPageLoading() {
  return (
    <div
      className="flex flex-1 items-center justify-center py-24"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-black" />
    </div>
  );
}
