"use client";

import { UserAccountNav } from "@/modules/auth";
import { BrandBackNav, PageHeader } from "@/modules/shared/ui";

export function StaffHeader() {
  return (
    <PageHeader
      leading={<BrandBackNav href="/join-venue" />}
      trailing={<UserAccountNav />}
    />
  );
}
