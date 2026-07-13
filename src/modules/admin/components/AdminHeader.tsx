"use client";

import { PageHeader } from "@/modules/shared/ui";
import { UserAccountNav } from "@/modules/auth";
import { AdminBrandBackNav } from "./AdminBrandBackNav";

export function AdminHeader() {
  return (
    <PageHeader
      leading={<AdminBrandBackNav />}
      trailing={<UserAccountNav />}
    />
  );
}
