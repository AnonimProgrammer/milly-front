import { apiRequest } from "@/modules/shared/api";
import type { ListOrdersParams, PageResponse, StaffOrderResponse } from "./types";

function ordersPath(venueId: string) {
  return `/api/v1/venues/${venueId}/orders`;
}

function buildOrdersQuery(params?: ListOrdersParams): string {
  if (!params) {
    return "";
  }

  const search = new URLSearchParams();

  if (params.status) {
    search.set("status", params.status);
  }
  if (params.from) {
    search.set("from", params.from);
  }
  if (params.to) {
    search.set("to", params.to);
  }
  if (params.cursor) {
    search.set("cursor", params.cursor);
  }
  if (params.limit != null) {
    search.set("limit", String(params.limit));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

type RequestOptions = {
  background?: boolean;
};

export async function listOrders(
  venueId: string,
  params?: ListOrdersParams,
  options?: RequestOptions,
): Promise<PageResponse<StaffOrderResponse>> {
  return apiRequest<PageResponse<StaffOrderResponse>>(
    `${ordersPath(venueId)}${buildOrdersQuery(params)}`,
    {
      background: options?.background,
      silent: options?.background,
    },
  );
}

export async function listAllOrders(
  venueId: string,
  params?: Omit<ListOrdersParams, "cursor">,
  options?: RequestOptions,
): Promise<StaffOrderResponse[]> {
  const orders: StaffOrderResponse[] = [];
  let cursor: string | undefined;

  do {
    const page = await listOrders(venueId, { ...params, cursor }, options);
    orders.push(...page.data);
    cursor = page.pagination.hasNext
      ? (page.pagination.nextCursor ?? undefined)
      : undefined;
  } while (cursor);

  return orders;
}

export async function approveOrder(
  venueId: string,
  orderId: string,
): Promise<StaffOrderResponse> {
  return apiRequest<StaffOrderResponse>(`${ordersPath(venueId)}/${orderId}/approve`, {
    method: "POST",
  });
}

export async function rejectOrder(
  venueId: string,
  orderId: string,
): Promise<StaffOrderResponse> {
  return apiRequest<StaffOrderResponse>(`${ordersPath(venueId)}/${orderId}/reject`, {
    method: "POST",
  });
}

export async function closeOrder(
  venueId: string,
  orderId: string,
): Promise<StaffOrderResponse> {
  return apiRequest<StaffOrderResponse>(`${ordersPath(venueId)}/${orderId}/close`, {
    method: "POST",
  });
}
