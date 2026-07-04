"use client";

import { useState } from "react";
import { MenuItem } from "../StaffPortalPage";

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

  // Form fields state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Mains");
  const [price, setPrice] = useState("");

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName("");
    setDescription("");
    setCategory("Mains");
    setPrice("");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setCategory(item.category);
    setPrice(item.price.toString());
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
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Please enter a valid price.");
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: priceNum,
    };

    if (editingItem) {
      onUpdateMenuItem(editingItem.id, payload);
    } else {
      onAddMenuItem(payload);
    }

    handleCloseForm();
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl relative">
      {/* Top Header & Trigger */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Menu</h2>
          <p className="text-sm text-zinc-500 font-light mt-1">
            Manage menu items shown to customers.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="text-sm font-semibold text-black hover:opacity-75 transition-opacity cursor-pointer border-b border-black pb-0.5"
        >
          Add item
        </button>
      </div>

      {/* Menu Items List */}
      <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white divide-y divide-zinc-200">
        {menuItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-zinc-400 font-light">No menu items found. Add some to get started.</p>
          </div>
        ) : (
          menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-6 py-5 hover:bg-zinc-50/50 transition-colors"
            >
              <div className="flex flex-col gap-1 pr-6">
                <span className="font-bold text-sm text-black">
                  {item.name}
                </span>
                <span className="text-xs text-zinc-500 font-light line-clamp-2">
                  {item.description}
                </span>
                <span className="text-xs text-zinc-400 font-light mt-1">
                  {item.category} &middot; {item.price.toFixed(2)} ₼
                </span>
              </div>

              {/* Row actions */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="text-xs text-zinc-400 hover:text-black transition-colors cursor-pointer font-light"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteMenuItem(item.id)}
                  className="text-xs text-zinc-400 hover:text-black transition-colors cursor-pointer font-light"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal Form Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div
            className="w-full max-w-lg bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            <div>
              <h3 className="text-lg font-bold text-black">
                {editingItem ? "Edit menu item" : "Add menu item"}
              </h3>
              <p className="text-xs text-zinc-500 font-light mt-1">
                Configure details for the item shown in client menu.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="item-name" className="text-xs font-semibold text-zinc-500 uppercase">
                  Item Name
                </label>
                <input
                  id="item-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pepperoni Pizza"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-black outline-none focus:border-black transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="item-desc" className="text-xs font-semibold text-zinc-500 uppercase">
                  Description
                </label>
                <textarea
                  id="item-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Tomato sauce, spicy pepperoni, fresh mozzarella"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-black outline-none focus:border-black transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="item-cat" className="text-xs font-semibold text-zinc-500 uppercase">
                    Category
                  </label>
                  <select
                    id="item-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-black outline-none focus:border-black transition-all cursor-pointer"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Mains">Mains</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="item-price" className="text-xs font-semibold text-zinc-500 uppercase">
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
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-black outline-none focus:border-black transition-all"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 text-zinc-500 hover:text-black text-sm font-medium hover:bg-zinc-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
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
