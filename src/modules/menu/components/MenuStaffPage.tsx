"use client";

import { useCallback, useEffect, useState } from "react";
import { LoadFailedMessage, StaffPageLoading } from "@/modules/staff";
import {
  createMenuItem,
  deleteMenuItem,
  listMenuItems,
  mapMenuItemResponse,
  updateMenuItem,
} from "../api";
import type { MenuItem } from "../types";
import { MenuSection } from "./MenuSection";

type MenuStaffPageProps = {
  venueId: string;
};

export function MenuStaffPage({ venueId }: MenuStaffPageProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  const loadMenu = useCallback(async () => {
    setLoadFailed(false);
    setIsLoading(true);

    try {
      const menuResponses = await listMenuItems(venueId, { background: true });
      setMenuItems(menuResponses.map(mapMenuItemResponse));
    } catch {
      setLoadFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [venueId]);

  useEffect(() => {
    void loadMenu();
  }, [loadMenu]);

  const handleAddMenuItem = async (item: Omit<MenuItem, "id">) => {
    try {
      const created = await createMenuItem(venueId, {
        name: item.name,
        description: item.description,
        price: item.price,
        approximatePreparationMinutes: item.approximatePreparationMinutes,
        category: item.category,
      });
      setMenuItems((prev) => [...prev, mapMenuItemResponse(created)]);
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleUpdateMenuItem = async (id: string, updatedItem: Omit<MenuItem, "id">) => {
    try {
      const updated = await updateMenuItem(venueId, id, {
        name: updatedItem.name,
        description: updatedItem.description,
        price: updatedItem.price,
        approximatePreparationMinutes: updatedItem.approximatePreparationMinutes,
        category: updatedItem.category,
      });
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === id ? mapMenuItemResponse(updated) : item,
        ),
      );
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await deleteMenuItem(venueId, id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      // Error toast is shown globally by the API client.
    }
  };

  if (isLoading) {
    return <StaffPageLoading />;
  }

  if (loadFailed) {
    return <LoadFailedMessage onRetry={() => void loadMenu()} />;
  }

  return (
    <MenuSection
      menuItems={menuItems}
      onAddMenuItem={(item) => void handleAddMenuItem(item)}
      onUpdateMenuItem={(id, item) => void handleUpdateMenuItem(id, item)}
      onDeleteMenuItem={(id) => void handleDeleteMenuItem(id)}
    />
  );
}
