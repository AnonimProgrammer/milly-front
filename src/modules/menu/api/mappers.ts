import type { MenuItem } from "../types";
import type { MenuItemResponse } from "./types";

const DEFAULT_CATEGORY = "Mains";

export function mapMenuItemResponse(item: MenuItemResponse): MenuItem {
  return {
    id: item.id,
    name: item.name,
    description: item.description ?? "",
    category: DEFAULT_CATEGORY,
    price: item.price,
    approximatePreparationMinutes: item.approximatePreparationMinutes,
  };
}
