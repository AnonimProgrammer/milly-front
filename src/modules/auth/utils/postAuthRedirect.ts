export function resolvePostAuthRedirect(intent: string | null): string {
  if (intent === "register-venue") {
    return "/register-venue";
  }

  if (intent === "join-venue") {
    return "/join-venue";
  }

  if (intent === "admin") {
    return "/admin/users";
  }

  if (intent?.startsWith("staff:")) {
    const venueId = intent.slice("staff:".length);
    if (venueId) {
      return `/venue/${venueId}/staff/orders`;
    }
  }

  return "/";
}
