const INVITE_PATH_PATTERN =
  /\/join-venue\/invite\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function parseInvitationToken(input: string): string | null {
  const trimmed = input.trim();

  const pathMatch = trimmed.match(INVITE_PATH_PATTERN);
  if (pathMatch) {
    return pathMatch[1];
  }

  if (UUID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  return null;
}
