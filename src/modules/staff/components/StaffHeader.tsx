"use client";

import { UserAccountNav } from "@/modules/auth/components/UserAccountNav";
import { BrandBackNav, PageHeader } from "@/modules/shared/ui";

export function StaffHeader() {
  return (
    <PageHeader
      leading={<BrandBackNav href="/join-venue" />}
      trailing={<UserAccountNav />}
    />
  );
}
