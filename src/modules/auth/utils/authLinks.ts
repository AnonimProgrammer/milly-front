import type { AuthStatus } from "../context/AuthProvider";
import { resolvePostAuthRedirect } from "./postAuthRedirect";

export type VenueIntent = "join-venue" | "register-venue";

export function authLink(path: "/login" | "/signup", intent?: string | null) {
  if (!intent) {
    return path;
  }

  return `${path}?intent=${encodeURIComponent(intent)}`;
}

export function resolveVenueEntryPath(intent: VenueIntent, status: AuthStatus): string {
  if (status !== "anonymous") {
    return resolvePostAuthRedirect(intent);
  }

  return `/login?intent=${encodeURIComponent(intent)}`;
}
