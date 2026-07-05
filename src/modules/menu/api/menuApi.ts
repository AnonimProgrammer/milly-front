import { apiRequest, apiRequestNoContent } from "@/modules/shared/api";
import type {
  CreateMenuItemRequest,
  MenuItemResponse,
  UpdateMenuItemRequest,
} from "./types";

function menuItemsPath(venueId: string) {
  return `/api/v1/venues/${venueId}/menu/items`;
}

export async function listMenuItems(venueId: string): Promise<MenuItemResponse[]> {
  return apiRequest<MenuItemResponse[]>(menuItemsPath(venueId));
}

export async function createMenuItem(
  venueId: string,
  request: CreateMenuItemRequest,
): Promise<MenuItemResponse> {
  return apiRequest<MenuItemResponse>(menuItemsPath(venueId), {
    method: "POST",
    body: request,
  });
}

export async function updateMenuItem(
  venueId: string,
  itemId: string,
  request: UpdateMenuItemRequest,
): Promise<MenuItemResponse> {
  return apiRequest<MenuItemResponse>(`${menuItemsPath(venueId)}/${itemId}`, {
    method: "PATCH",
    body: request,
  });
}

export async function deleteMenuItem(venueId: string, itemId: string): Promise<void> {
  return apiRequestNoContent(`${menuItemsPath(venueId)}/${itemId}`, {
    method: "DELETE",
  });
}
