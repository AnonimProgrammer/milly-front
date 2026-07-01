export const ACCESS_TOKEN_COOKIE = "access-token";

export function isProtectedRoute(pathname: string): boolean {
  if (pathname === "/join-venue" || pathname === "/register-venue") {
    return true;
  }

  return /^\/venue\/[^/]+\/staff\/?$/.test(pathname);
}

export function getLoginIntent(pathname: string): string {
  if (pathname.startsWith("/register-venue")) {
    return "register-venue";
  }

  return "join-venue";
}
