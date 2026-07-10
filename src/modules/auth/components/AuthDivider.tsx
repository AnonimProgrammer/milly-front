import { textMuted } from "@/modules/shared/theme/classNames";

export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
        <span className={`bg-card px-3 font-light ${textMuted}`}>or continue with</span>
      </div>
    </div>
  );
}
