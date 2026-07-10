"use client";

import { useMemo, useState } from "react";
import { getCategoriesFromMenu, MENU_CATEGORIES } from "../categories";
import type { MenuItem } from "../types";

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Mains");
  const [price, setPrice] = useState("");
  const [approximatePreparationMinutes, setApproximatePreparationMinutes] = useState("15");

  const categories = useMemo(() => getCategoriesFromMenu(menuItems), [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setDescription("");
    setCategory("Mains");
    setPrice("");
    setApproximatePreparationMinutes("15");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setCategory(item.category);
    setPrice(item.price.toString());
    setApproximatePreparationMinutes(item.approximatePreparationMinutes.toString());
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;

    const priceNum = parseFloat(price);
    const prepMinutes = parseInt(approximatePreparationMinutes, 10);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Please enter a valid price.");
      return;
    }
    if (isNaN(prepMinutes) || prepMinutes < 1 || prepMinutes > 480) {
      alert("Please enter a preparation time between 1 and 480 minutes.");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: priceNum,
      approximatePreparationMinutes: prepMinutes,
    };

    if (editingItem) {
      onUpdateMenuItem(editingItem.id, payload);
    } else {
      onAddMenuItem(payload);
    }

    handleCloseForm();
  };

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-zinc-100">Menu</h2>
          <p className="mt-1 text-sm font-light text-zinc-500 dark:text-zinc-400">
            Manage menu items shown to customers.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="cursor-pointer border-b border-black dark:border-zinc-300 pb-0.5 text-sm font-semibold text-black dark:text-zinc-100 transition-opacity hover:opacity-75"
        >
          Add item
        </button>
      </div>

      {menuItems.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((menuCategory) => (
            <button
              key={menuCategory}
              type="button"
              onClick={() => setActiveCategory(menuCategory)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === menuCategory
                  ? "bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-zinc-200"
                  : "bg-neutral-100 dark:bg-zinc-800 text-black dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-700"
              }`}
            >
              {menuCategory}
            </button>
          ))}
        </div>
      )}

      <div className="divide-y divide-zinc-200 dark:divide-zinc-700/60 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40">
        {menuItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-light text-zinc-400 dark:text-zinc-500">
              No menu items found. Add some to get started.
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-light text-zinc-400 dark:text-zinc-500">
              No items in this category.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-5 transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/5"
            >
              <div className="flex flex-col gap-1 pr-6">
                <span className="text-sm font-bold text-black dark:text-zinc-100">{item.name}</span>
                <span className="line-clamp-2 text-xs font-light text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </span>
                <span className="mt-1 text-xs font-light text-zinc-400 dark:text-zinc-500">
                  {item.category} &middot; {item.price.toFixed(2)} ₼ &middot; ~{item.approximatePreparationMinutes} min prep
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="cursor-pointer text-xs font-light text-zinc-400 dark:text-zinc-500 transition-colors hover:text-black dark:hover:text-zinc-100"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteMenuItem(item.id)}
                  className="cursor-pointer text-xs font-light text-zinc-400 dark:text-zinc-500 transition-colors hover:text-black dark:hover:text-zinc-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 p-4 backdrop-blur-xs">
          <div
            className="animate-in fade-in zoom-in-95 flex w-full max-w-lg flex-col gap-5 rounded-3xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 shadow-2xl dark:shadow-black/40 duration-200 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <div>
              <h3 className="text-lg font-bold text-black dark:text-zinc-100">
                {editingItem ? "Edit menu item" : "Add menu item"}
              </h3>
              <p className="mt-1 text-xs font-light text-zinc-500 dark:text-zinc-400">
                Configure details for the item shown in client menu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="item-name" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                  Item Name
                </label>
                <input
                  id="item-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pepperoni Pizza"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-black dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:border-black dark:focus:border-zinc-400"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="item-desc" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                  Description
                </label>
                <textarea
                  id="item-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Tomato sauce, spicy pepperoni, fresh mozzarella"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-black dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:border-black dark:focus:border-zinc-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="item-cat" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                    Category
                  </label>
                  <select
                    id="item-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full cursor-pointer rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-black dark:text-zinc-100 outline-none transition-all focus:border-black dark:focus:border-zinc-400"
                  >
                    {MENU_CATEGORIES.map((menuCategory) => (
                      <option key={menuCategory} value={menuCategory}>
                        {menuCategory}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="item-price" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                    Price (₼)
                  </label>
                  <input
                    id="item-price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 18.00"
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-black dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:border-black dark:focus:border-zinc-400"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="item-prep" className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                  Approx. preparation time (minutes)
                </label>
                <input
                  id="item-prep"
                  type="number"
                  min="1"
                  max="480"
                  value={approximatePreparationMinutes}
                  onChange={(e) => setApproximatePreparationMinutes(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-black dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 outline-none transition-all focus:border-black dark:focus:border-zinc-400"
                  required
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-zinc-100 dark:border-zinc-700 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="cursor-pointer rounded-xl border border-zinc-200 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-black dark:bg-white px-6 py-2.5 text-sm font-medium text-white dark:text-black transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
