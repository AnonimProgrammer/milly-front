import type { ReactNode } from "react";
import { AccountLayout } from "@/modules/account";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <AccountLayout>{children}</AccountLayout>;
}
