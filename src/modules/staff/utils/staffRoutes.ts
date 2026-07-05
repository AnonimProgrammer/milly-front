export type StaffSection = "orders" | "menu" | "tables" | "members";

const STAFF_SECTION_PATTERN = /^\/venue\/[^/]+\/staff\/(orders|menu|tables|members)\/?$/;

export function staffPath(venueId: string, section: StaffSection = "orders"): string {
  return `/venue/${venueId}/staff/${section}`;
}

export function getStaffSectionFromPath(pathname: string): StaffSection | null {
  const match = pathname.match(STAFF_SECTION_PATTERN);
  return match ? (match[1] as StaffSection) : null;
}

export function isStaffRoute(pathname: string): boolean {
  return /^\/venue\/[^/]+\/staff(\/(orders|menu|tables|members))?\/?$/.test(pathname);
}
