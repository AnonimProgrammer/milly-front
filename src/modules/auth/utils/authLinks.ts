import type { AuthStatus } from "../context/AuthProvider";
import { resolvePostAuthRedirect } from "./postAuthRedirect";

export type VenueIntent = "join-venue" | "register-venue";

export function authLink(path: "/login" | "/signup", intent?: string | null) {
  if (!intent) {
    return path;
  }

  return `${path}?intent=${encodeURIComponent(intent)}`;
}

/** True when the user is confirmed logged in. */
export function isAuthenticatedStatus(status: AuthStatus): boolean {
  return status === "authenticated";
}

export function resolveVenueEntryPath(intent: VenueIntent, status: AuthStatus): string {
  if (isAuthenticatedStatus(status)) {
    return resolvePostAuthRedirect(intent);
  }

  return `/login?intent=${encodeURIComponent(intent)}`;
}
