import { ProfileSection } from "@/modules/account";
import { textMuted } from "@/modules/shared/theme/classNames";

export default function ProfilePage() {
  return (
    <>
      <div>
        <h1 className="text-xl font-light tracking-tight text-foreground sm:text-3xl">Profile</h1>
        <p className={`mt-1 text-xs font-light sm:mt-1.5 sm:text-sm ${textMuted}`}>
          Manage your account details
        </p>
      </div>

      <ProfileSection />
    </>
  );
}
