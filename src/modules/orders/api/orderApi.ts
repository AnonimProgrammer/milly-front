import { apiRequest } from "@/modules/shared/api";
import type { StaffOrderResponse } from "./types";

function ordersPath(venueId: string) {
  return `/api/v1/venues/${venueId}/orders`;
}

export async function listOrders(venueId: string): Promise<StaffOrderResponse[]> {
  return apiRequest<StaffOrderResponse[]>(ordersPath(venueId));
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
