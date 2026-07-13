export type AdminSection = "users";

const ADMIN_SECTION_PATTERN = /^\/admin\/(users)\/?$/;

export function adminPath(section: AdminSection = "users"): string {
  return `/admin/${section}`;
}

export function getAdminSectionFromPath(pathname: string): AdminSection | null {
  const match = pathname.match(ADMIN_SECTION_PATTERN);
  return match ? (match[1] as AdminSection) : null;
}

export function isAdminRoute(pathname: string): boolean {
  return /^\/admin(\/(users))?\/?$/.test(pathname);
}
