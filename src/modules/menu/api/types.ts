export type MenuItemStatus = "ACTIVE" | "DELETED";

export type MenuItemResponse = {
  id: string;
  venueId: string;
  name: string;
  description: string | null;
  price: number;
  approximatePreparationMinutes: number;
  category: string;
  status: MenuItemStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateMenuItemRequest = {
  name: string;
  description?: string;
  price: number;
  approximatePreparationMinutes: number;
  category: string;
};

export type UpdateMenuItemRequest = {
  name?: string;
  description?: string;
  price?: number;
  approximatePreparationMinutes?: number;
  category?: string;
};
