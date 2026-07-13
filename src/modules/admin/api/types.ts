export type SystemRole = "USER" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  status: UserStatus;
  createdAt: string;
  roles: SystemRole[];
};

export type PaginationMeta = {
  nextCursor: string | null;
  previousCursor: string | null;
  hasNext: boolean;
  hasPrevious: boolean;
  limit: number;
};

export type PageResponse<T> = {
  data: T[];
  pagination: PaginationMeta;
};

export type ListAdminUsersParams = {
  cursor?: string;
  limit?: number;
  status?: UserStatus;
  role?: SystemRole;
  email?: string;
  phoneNumber?: string;
  name?: string;
  createdFrom?: string;
  createdTo?: string;
};

export type UpdateAdminUserRequest = {
  status?: UserStatus;
  roles?: SystemRole[];
};
