import type { CurrentUser } from "@/modules/auth/api/types";

export const SYSTEM_ADMIN_ROLE = "ADMIN";

export function isSystemAdmin(user: CurrentUser | null | undefined): boolean {
  return Boolean(user?.roles?.includes(SYSTEM_ADMIN_ROLE));
}
