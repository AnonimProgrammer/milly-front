"use client";

import { useState, type SubmitEvent } from "react";
import {
  inputField,
  modalOverlay,
  modalPanel,
  primaryButton,
  secondaryButton,
  textMuted,
} from "@/modules/shared/theme/classNames";
import { MENU_CATEGORIES } from "../categories";
import type { MenuItem } from "../types";

type MenuItemFormValues = Omit<MenuItem, "id">;

type MenuItemFormModalProps = {
  editingItem: MenuItem | null;
  onClose: () => void;
  onSubmit: (values: MenuItemFormValues) => void;
};

export function MenuItemFormModal({
  editingItem,
  onClose,
  onSubmit,
}: MenuItemFormModalProps) {
  const [name, setName] = useState(editingItem?.name ?? "");
  const [description, setDescription] = useState(editingItem?.description ?? "");
  const [category, setCategory] = useState(editingItem?.category ?? "Mains");
  const [price, setPrice] = useState(editingItem ? editingItem.price.toString() : "");
  const [approximatePreparationMinutes, setApproximatePreparationMinutes] = useState(
    editingItem ? editingItem.approximatePreparationMinutes.toString() : "15",
  );

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !price.trim()) {
      return;
    }

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

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      price: priceNum,
      approximatePreparationMinutes: prepMinutes,
    });
  };

  return (
    <div className={modalOverlay}>
      <div
        className={`animate-in fade-in zoom-in-95 flex w-full max-w-lg flex-col gap-5 duration-200 ${modalPanel}`}
        role="dialog"
        aria-modal="true"
      >
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {editingItem ? "Edit menu item" : "Add menu item"}
          </h3>
          <p className={`mt-1 text-xs font-light ${textMuted}`}>
            Configure details for the item shown in client menu.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="item-name" className={`text-xs font-semibold uppercase ${textMuted}`}>
              Item Name
            </label>
            <input
              id="item-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Pepperoni Pizza"
              className={inputField}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="item-desc" className={`text-xs font-semibold uppercase ${textMuted}`}>
              Description
            </label>
            <textarea
              id="item-desc"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="e.g. Tomato sauce, spicy pepperoni, fresh mozzarella"
              rows={3}
              className={`resize-none ${inputField}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="item-cat" className={`text-xs font-semibold uppercase ${textMuted}`}>
                Category
              </label>
              <select
                id="item-cat"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={`cursor-pointer ${inputField}`}
              >
                {MENU_CATEGORIES.map((menuCategory) => (
                  <option key={menuCategory} value={menuCategory}>
                    {menuCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="item-price" className={`text-xs font-semibold uppercase ${textMuted}`}>
                Price (₼)
              </label>
              <input
                id="item-price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="e.g. 18.00"
                className={inputField}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="item-prep" className={`text-xs font-semibold uppercase ${textMuted}`}>
              Approx. preparation time (minutes)
            </label>
            <input
              id="item-prep"
              type="number"
              min="1"
              max="480"
              value={approximatePreparationMinutes}
              onChange={(event) => setApproximatePreparationMinutes(event.target.value)}
              placeholder="e.g. 15"
              className={inputField}
              required
            />
          </div>

          <div className="mt-4 flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium ${secondaryButton}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`cursor-pointer rounded-xl px-6 py-2.5 text-sm font-medium ${primaryButton}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
