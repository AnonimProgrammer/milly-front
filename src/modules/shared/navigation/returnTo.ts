const ACCOUNT_PATH_PREFIX = "/settings";

/** Only allow same-origin app paths (no open redirects). */
export function isSafeReturnPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes(":");
}

export function shouldCaptureReturnTo(pathname: string): boolean {
  return !pathname.startsWith(ACCOUNT_PATH_PREFIX);
}

export function withReturnTo(path: string, returnTo: string): string {
  if (!isSafeReturnPath(returnTo)) {
    return path;
  }

  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}returnTo=${encodeURIComponent(returnTo)}`;
}

export function readReturnTo(searchParams: URLSearchParams): string | null {
  const value = searchParams.get("returnTo");

  if (!value || !isSafeReturnPath(value)) {
    return null;
  }

  return value;
}
