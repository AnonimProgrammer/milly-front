import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolvePostAuthRedirect } from "@/modules/auth/utils/postAuthRedirect";
import {
  ACCESS_TOKEN_COOKIE,
  getLoginIntent,
  isProtectedRoute,
} from "@/modules/auth/utils/protectedRoutes";

const API_PREFIX = "/api/v1";
const AUTH_PAGES = new Set(["/login", "/signup"]);

function getBackendUrl(): string {
  return (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");
}

function hasAccessToken(request: NextRequest): boolean {
  return Boolean(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(API_PREFIX)) {
    const backendUrl = new URL(`${pathname}${request.nextUrl.search}`, getBackendUrl());
    return NextResponse.rewrite(backendUrl);
  }

  if (AUTH_PAGES.has(pathname) && hasAccessToken(request)) {
    const intent = request.nextUrl.searchParams.get("intent");
    return NextResponse.redirect(new URL(resolvePostAuthRedirect(intent), request.url));
  }

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
    "/login",
    "/signup",
    "/join-venue",
    "/register-venue",
    "/venue/:venueId/staff/:path*",
  ],
};
