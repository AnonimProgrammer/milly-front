import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE, getLoginIntent, isProtectedRoute, REFRESH_TOKEN_COOKIE } from "@/modules/auth";

const API_PREFIX = "/api/v1";
const BACKEND_COOKIES = new Set([ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE]);

function getBackendUrl(): string {
  return (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

function hasAccessToken(request: NextRequest): boolean {
  return Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);
}

function buildBackendCookieHeader(request: NextRequest): string | undefined {
  const cookies = request.cookies
    .getAll()
    .filter((cookie) => BACKEND_COOKIES.has(cookie.name))
    .map((cookie) => `${cookie.name}=${cookie.value}`);

  return cookies.length > 0 ? cookies.join("; ") : undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(API_PREFIX)) {
    const backendUrl = new URL(`${pathname}${request.nextUrl.search}`, getBackendUrl());
    const requestHeaders = new Headers(request.headers);
    const backendCookies = buildBackendCookieHeader(request);

    if (backendCookies) {
      requestHeaders.set("cookie", backendCookies);
    } else {
      requestHeaders.delete("cookie");
    }

    return NextResponse.rewrite(backendUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Login/signup access is decided client-side (RedirectIfAuthenticated) so stale
  // cookies do not block auth pages when the backend is down or the session expired.

  if (isProtectedRoute(pathname)) {
    if (!hasAccessToken(request)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("intent", getLoginIntent(pathname));
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/v1/:path*",
    "/join-venue/:path*",
    "/register-venue",
    "/venue/:venueId/staff/:path*",
  ],
};
