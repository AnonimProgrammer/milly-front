import { AppearanceSection } from "@/modules/account";
import { textMuted } from "@/modules/shared/theme/classNames";

export default function SettingsPage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-light tracking-tight text-foreground">Settings</h1>
        <p className={`mt-1.5 text-sm font-light ${textMuted}`}>
          Customize your Milly experience
        </p>
      </div>

      <AppearanceSection />
    </>
  );
}
