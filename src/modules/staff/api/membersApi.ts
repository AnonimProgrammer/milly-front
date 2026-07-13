import { apiRequest } from "@/modules/shared/api";
import type {
  ListMembersParams,
  PageResponse,
  UpdateVenueMemberRequest,
  VenueMemberResponse,
} from "./types";

function membersPath(venueId: string) {
  return `/api/v1/venues/${venueId}/members`;
}

function buildMembersQuery(params?: ListMembersParams): string {
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

  const query = search.toString();
  return query ? `?${query}` : "";
}

type RequestOptions = {
  background?: boolean;
};

export async function listMembers(
  venueId: string,
  params?: ListMembersParams,
  options?: RequestOptions,
): Promise<PageResponse<VenueMemberResponse>> {
  return apiRequest<PageResponse<VenueMemberResponse>>(
    `${membersPath(venueId)}${buildMembersQuery(params)}`,
    {
      background: options?.background,
      silent: options?.background,
    },
  );
}

export async function listAllMembers(
  venueId: string,
  params?: Omit<ListMembersParams, "cursor">,
  options?: RequestOptions,
): Promise<VenueMemberResponse[]> {
  const members: VenueMemberResponse[] = [];
  let cursor: string | undefined;

  do {
    const page = await listMembers(venueId, { ...params, cursor }, options);
    members.push(...page.data);
    cursor = page.pagination.hasNext
      ? (page.pagination.nextCursor ?? undefined)
      : undefined;
  } while (cursor);

  return members;
}

export async function updateMember(
  venueId: string,
  memberId: string,
  request: UpdateVenueMemberRequest,
): Promise<VenueMemberResponse> {
  return apiRequest<VenueMemberResponse>(`${membersPath(venueId)}/${memberId}`, {
    method: "PATCH",
    body: request,
  });
}
