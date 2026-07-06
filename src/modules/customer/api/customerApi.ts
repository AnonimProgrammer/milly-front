import { apiRequest } from "@/modules/shared/api";
import type {
  AddPublicOrderItemsRequest,
  CreatePublicOrderRequest,
  PublicMenuItemResponse,
  PublicOrderResponse,
  PublicTableResponse,
} from "./types";

function tablePath(tableId: string) {
  return `/api/v1/public/tables/${tableId}`;
}

export async function getPublicTable(tableId: string): Promise<PublicTableResponse> {
  return apiRequest<PublicTableResponse>(tablePath(tableId));
}

export async function listPublicMenuItems(tableId: string): Promise<PublicMenuItemResponse[]> {
  return apiRequest<PublicMenuItemResponse[]>(`${tablePath(tableId)}/menu`);
}

export async function listPublicOrders(
  tableId: string,
  options?: { background?: boolean },
): Promise<PublicOrderResponse[]> {
  return apiRequest<PublicOrderResponse[]>(`${tablePath(tableId)}/orders`, {
    background: options?.background,
    silent: options?.background,
  });
}

export async function createPublicOrder(
  tableId: string,
  request: CreatePublicOrderRequest,
): Promise<PublicOrderResponse> {
  return apiRequest<PublicOrderResponse>(`${tablePath(tableId)}/orders`, {
    method: "POST",
    body: request,
  });
}

export async function addPublicOrderItems(
  tableId: string,
  orderId: string,
  request: AddPublicOrderItemsRequest,
): Promise<PublicOrderResponse> {
  return apiRequest<PublicOrderResponse>(`${tablePath(tableId)}/orders/${orderId}/items`, {
    method: "POST",
    body: request,
  });
}
