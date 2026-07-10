import { apiRequest } from "@/modules/shared/api";
import type {
  AddPublicOrderItemsRequest,
  CreatePublicOrderRequest,
  PublicMenuItemResponse,
  PublicOrderResponse,
  PublicTableResponse,
} from "./types";

type PublicApiOptions = {
  background?: boolean;
};

function tablePath(tableId: string) {
  return `/api/v1/public/tables/${tableId}`;
}

function publicRequestOptions(options?: PublicApiOptions) {
  return {
    background: options?.background,
    silent: options?.background,
  };
}

export async function getPublicTable(
  tableId: string,
  options?: PublicApiOptions,
): Promise<PublicTableResponse> {
  return apiRequest<PublicTableResponse>(tablePath(tableId), publicRequestOptions(options));
}

export async function listPublicMenuItems(
  tableId: string,
  options?: PublicApiOptions,
): Promise<PublicMenuItemResponse[]> {
  return apiRequest<PublicMenuItemResponse[]>(
    `${tablePath(tableId)}/menu`,
    publicRequestOptions(options),
  );
}

export async function listPublicOrders(
  tableId: string,
  options?: PublicApiOptions,
): Promise<PublicOrderResponse[]> {
  return apiRequest<PublicOrderResponse[]>(
    `${tablePath(tableId)}/orders`,
    publicRequestOptions(options),
  );
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
