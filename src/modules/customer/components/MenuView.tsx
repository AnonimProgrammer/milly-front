"use client";

import { useMemo, useState } from "react";
import { Button } from "@/modules/shared/ui";
import type { MenuItem } from "@/modules/menu";
import type { Order } from "@/modules/orders";
import { formatAmount, getOrderTotal } from "@/modules/orders";

type MenuViewProps = {
  tableLabel: string;
  menuItems: MenuItem[];
  activeOrder: Order | null;
  onPlaceOrder: (items: { menuItemId: string; quantity: number }[]) => Promise<void>;
  onOrderPlaced: () => void;
};

function getCategoriesFromMenu(menuItems: MenuItem[]): string[] {
  const categories = new Set(menuItems.map((item) => item.category));
  return ["All", ...Array.from(categories).sort()];
}

export function MenuView({
  tableLabel,
  menuItems,
  activeOrder,
  onPlaceOrder,
  onOrderPlaced,
}: MenuViewProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const categories = useMemo(() => getCategoriesFromMenu(menuItems), [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, quantity]) => {
        const item = menuItems.find((entry) => entry.id === id)!;
        return {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity,
        };
      });
  }, [cart, menuItems]);

  const cartTotal = getOrderTotal(cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function updateQuantity(id: string, delta: number) {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }

  async function handlePlaceOrder() {
    if (cartItems.length === 0 || submitting) return;

    setSubmitting(true);
    try {
      await onPlaceOrder(
        cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      );
      setCart({});
      onOrderPlaced();
    } finally {
      setSubmitting(false);
    }
  }

  const isAddingToApprovedOrder = activeOrder?.status === "approved";

  return (
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col bg-white">
      <header className="border-b border-neutral-200 px-5 py-4">
        <p className="text-sm text-neutral-500">{tableLabel}</p>
        <h1 className="text-xl font-bold text-black">
          {isAddingToApprovedOrder ? "Add items" : "Menu"}
        </h1>
      </header>

      <div className="flex gap-2 overflow-x-auto px-5 py-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-neutral-100 text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="flex-1 divide-y divide-neutral-100 px-5 pb-32">
        {filteredItems.map((item) => {
          const qty = cart[item.id] ?? 0;
          return (
            <li key={item.id} className="flex items-center justify-between py-4">
              <div className="flex-1 pr-4">
                <p className="font-medium text-black">{item.name}</p>
                <p className="text-sm text-neutral-500">{item.description}</p>
                <p className="mt-1 text-sm font-medium text-black">
                  {formatAmount(item.price)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {qty > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 text-black"
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-sm font-medium">{qty}</span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white px-5 py-4">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
            <div>
              <p className="text-sm text-neutral-500">{cartCount} items</p>
              <p className="font-semibold text-black">{formatAmount(cartTotal)}</p>
            </div>
            <Button className="!w-auto px-6" onClick={handlePlaceOrder} disabled={submitting}>
              {isAddingToApprovedOrder ? "Add to order" : "Place order"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
