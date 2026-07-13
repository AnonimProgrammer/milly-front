import type { ListAdminUsersParams, SystemRole, UserStatus } from "../api/types";

export type AdminUserListFilter =
  | "all"
  | "active"
  | "inactive"
  | "suspended"
  | "admins";

export const adminUserListFilters: { id: AdminUserListFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
  { id: "suspended", label: "Suspended" },
  { id: "admins", label: "Admins" },
];

export type AdminUserSearchFilters = {
  name: string;
  email: string;
  phoneNumber: string;
};

export const emptyAdminUserSearchFilters: AdminUserSearchFilters = {
  name: "",
  email: "",
  phoneNumber: "",
};

export function adminUserFilterToParams(
  filter: AdminUserListFilter,
  search: AdminUserSearchFilters,
  limit: number,
  cursor?: string,
): ListAdminUsersParams {
  const params: ListAdminUsersParams = { limit, cursor };

  switch (filter) {
    case "active":
      params.status = "ACTIVE";
      break;
    case "inactive":
      params.status = "INACTIVE";
      break;
    case "suspended":
      params.status = "SUSPENDED";
      break;
    case "admins":
      params.role = "ADMIN";
      break;
    case "all":
      break;
  }

  if (search.name.trim()) {
    params.name = search.name.trim();
  }
  if (search.email.trim()) {
    params.email = search.email.trim();
  }
  if (search.phoneNumber.trim()) {
    params.phoneNumber = search.phoneNumber.trim();
  }

  return params;
}

export function adminUserFilterEmptyMessage(filter: AdminUserListFilter): string {
  switch (filter) {
    case "active":
      return "No active users.";
    case "inactive":
      return "No inactive users.";
    case "suspended":
      return "No suspended users.";
    case "admins":
      return "No admin users.";
    case "all":
      return "No users found.";
  }
}

export function formatSystemRole(role: SystemRole): string {
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "USER":
      return "User";
  }
}

export function formatUserStatus(status: UserStatus): string {
  switch (status) {
    case "ACTIVE":
      return "Active";
    case "INACTIVE":
      return "Inactive";
    case "SUSPENDED":
      return "Suspended";
  }
}
