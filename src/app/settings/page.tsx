import { AppearanceSection } from "@/modules/account";
import { textMuted } from "@/modules/shared/theme/classNames";

export default function SettingsPage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-light tracking-tight text-foreground sm:text-3xl">Settings</h1>
        <p className={`mt-1 text-xs font-light sm:mt-1.5 sm:text-sm ${textMuted}`}>
          Customize your Milly experience
        </p>
      </div>

      <AppearanceSection />
    </>
  );
}
