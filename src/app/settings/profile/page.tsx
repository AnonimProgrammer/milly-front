import { ProfileSection } from "@/modules/account";
import { textMuted } from "@/modules/shared/theme/classNames";

export default function ProfilePage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-light tracking-tight text-foreground">Profile</h1>
        <p className={`mt-1.5 text-sm font-light ${textMuted}`}>
          Manage your account details
        </p>
      </div>

      <ProfileSection />
    </>
  );
}
