import type { VenueMember } from "../types/members";

export type VenueMemberResponse = VenueMember;

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

export type ListMembersParams = {
  cursor?: string;
  limit?: number;
};
