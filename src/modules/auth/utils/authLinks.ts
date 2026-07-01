export function authLink(path: "/login" | "/signup", intent?: string | null) {
  if (!intent) {
    return path;
  }

  return `${path}?intent=${encodeURIComponent(intent)}`;
}
