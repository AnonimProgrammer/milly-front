import type { VenueRole } from "../api/types";

export function canManageVenue(role: VenueRole): boolean {
  return role === "OWNER" || role === "MANAGER";
}

export function formatVenueRole(role: VenueRole): string {
  switch (role) {
    case "OWNER":
      return "Owner";
    case "MANAGER":
      return "Manager";
    case "EMPLOYEE":
      return "Employee";
  }
}
