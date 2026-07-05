import { isStaffRoute } from "@/modules/staff/utils/staffRoutes";

export const ACCESS_TOKEN_COOKIE = "access-token";

export function isProtectedRoute(pathname: string): boolean {
  if (pathname === "/join-venue" || pathname === "/register-venue") {
    return true;
  }

  return isStaffRoute(pathname);
}

export function getLoginIntent(pathname: string): string {
  if (pathname.startsWith("/register-venue")) {
    return "register-venue";
  }

  const staffMatch = pathname.match(/^\/venue\/([^/]+)\/staff/);
  if (staffMatch) {
    return `staff:${staffMatch[1]}`;
  }

  return "join-venue";
}
