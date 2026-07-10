import { surfacePanel } from "@/modules/shared/theme/classNames";

export function AuthPageFallback() {
  return (
    <main className="min-h-screen bg-transparent flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 sm:p-10 animate-pulse h-[400px] ${surfacePanel}`} />
    </main>
  );
}
