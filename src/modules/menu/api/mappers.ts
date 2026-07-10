import type { MenuItem } from "../types";
import type { MenuItemResponse } from "./types";

export function mapMenuItemResponse(item: MenuItemResponse): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    category: item.category,
    price: item.price,
    approximatePreparationMinutes: item.approximatePreparationMinutes,
  };
}
