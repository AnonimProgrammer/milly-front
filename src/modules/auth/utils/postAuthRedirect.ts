export function resolvePostAuthRedirect(intent: string | null): string {
  if (intent === "register-venue") {
    return "/register-venue";
  }

  if (intent === "join-venue") {
    return "/join-venue";
  }

  return "/";
}
