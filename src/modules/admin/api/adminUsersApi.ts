import { apiRequest } from "@/modules/shared/api";
import type {
  AdminUser,
  ListAdminUsersParams,
  PageResponse,
  UpdateAdminUserRequest,
} from "./types";

const USERS_PATH = "/api/v1/admin/users";

function buildUsersQuery(params?: ListAdminUsersParams): string {
  if (!params) {
    return "";
  }

  const search = new URLSearchParams();

  if (params.cursor) {
    search.set("cursor", params.cursor);
  }
  if (params.limit != null) {
    search.set("limit", String(params.limit));
  }
  if (params.status) {
    search.set("status", params.status);
  }
  if (params.role) {
    search.set("role", params.role);
  }
  if (params.email) {
    search.set("email", params.email);
  }
  if (params.phoneNumber) {
    search.set("phoneNumber", params.phoneNumber);
  }
  if (params.name) {
    search.set("name", params.name);
  }
  if (params.createdFrom) {
    search.set("createdFrom", params.createdFrom);
  }
  if (params.createdTo) {
    search.set("createdTo", params.createdTo);
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

type RequestOptions = {
  background?: boolean;
};

export async function listAdminUsers(
  params?: ListAdminUsersParams,
  options?: RequestOptions,
): Promise<PageResponse<AdminUser>> {
  return apiRequest<PageResponse<AdminUser>>(`${USERS_PATH}${buildUsersQuery(params)}`, {
    background: options?.background,
    silent: options?.background,
  });
}

export async function updateAdminUser(
  userId: string,
  request: UpdateAdminUserRequest,
): Promise<AdminUser> {
  return apiRequest<AdminUser>(`${USERS_PATH}/${userId}`, {
    method: "PATCH",
    body: request,
  });
}
