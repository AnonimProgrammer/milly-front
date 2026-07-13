import { isAdminRoute } from "@/modules/admin/utils/adminRoutes";
import { isStaffRoute } from "@/modules/staff";

export const ACCESS_TOKEN_COOKIE = "access-token";
export const REFRESH_TOKEN_COOKIE = "refresh-token";

export function isProtectedRoute(pathname: string): boolean {
  if (
    pathname === "/join-venue" ||
    pathname.startsWith("/join-venue/") ||
    pathname === "/register-venue"
  ) {
    return true;
  }

  if (isAdminRoute(pathname)) {
    return true;
  }

  return isStaffRoute(pathname);
}

export function getLoginIntent(pathname: string): string {
  if (pathname.startsWith("/register-venue")) {
    return "register-venue";
  }

  if (isAdminRoute(pathname)) {
    return "admin";
  }

  const staffMatch = pathname.match(/^\/venue\/([^/]+)\/staff/);
  if (staffMatch) {
    return `staff:${staffMatch[1]}`;
  }

  return "join-venue";
}
