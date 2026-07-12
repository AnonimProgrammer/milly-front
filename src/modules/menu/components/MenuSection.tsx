"use client";

import { useMemo, useState } from "react";
import { textMuted } from "@/modules/shared/theme/classNames";
import { getCategoriesFromMenu } from "../categories";
import type { MenuItem } from "../types";
import { MenuCategoryTabs } from "./MenuCategoryTabs";
import { MenuItemFormModal } from "./MenuItemFormModal";
import { MenuItemRow } from "./MenuItemRow";

type MenuSectionProps = {
  menuItems: MenuItem[];
  onAddMenuItem: (item: Omit<MenuItem, "id">) => void;
  onUpdateMenuItem: (id: string, updatedItem: Omit<MenuItem, "id">) => void;
  onDeleteMenuItem: (id: string) => void;
};

export function MenuSection({
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
}: MenuSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => getCategoriesFromMenu(menuItems), [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (values: Omit<MenuItem, "id">) => {
    if (editingItem) {
      onUpdateMenuItem(editingItem.id, values);
    } else {
      onAddMenuItem(values);
    }

    handleCloseForm();
  };

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Menu</h2>
          <p className={`mt-1 text-sm font-light ${textMuted}`}>
            Manage menu items shown to customers.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="cursor-pointer border-b border-foreground pb-0.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-75"
        >
          Add item
        </button>
      </div>

      {menuItems.length > 0 ? (
        <MenuCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      ) : null}

      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {menuItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className={`text-sm font-light ${textMuted}`}>
              No menu items found. Add some to get started.
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className={`text-sm font-light ${textMuted}`}>No items in this category.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <MenuItemRow
              key={item.id}
              item={item}
              onEdit={handleOpenEdit}
              onDelete={onDeleteMenuItem}
            />
          ))
        )}
      </div>

      {isFormOpen ? (
        <MenuItemFormModal
          editingItem={editingItem}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}
