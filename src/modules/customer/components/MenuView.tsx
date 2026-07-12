"use client";

import { useMemo, useState } from "react";
import { Button } from "@/modules/shared/ui";
import { getCategoriesFromMenu } from "@/modules/menu/categories";
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
    <div className="mx-auto flex min-h-full w-full max-w-lg flex-col bg-card text-card-foreground">
      <header className="border-b border-border px-2.5 py-2 sm:px-5 sm:py-4">
        <p className="text-[11px] text-muted-foreground sm:text-sm">{tableLabel}</p>
        <h1 className="text-base font-bold text-foreground sm:text-xl">
          {isAddingToApprovedOrder ? "Add items" : "Menu"}
        </h1>
      </header>

      <div className="flex gap-1.5 overflow-x-auto px-2.5 py-2 snap-x snap-mandatory sm:gap-2 sm:px-5 sm:py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`shrink-0 snap-start rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors sm:px-4 sm:py-1.5 sm:text-sm ${
              activeCategory === category
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-muted text-foreground hover:bg-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <ul className="flex-1 divide-y divide-border px-2.5 pb-24 sm:px-5 sm:pb-32">
        {filteredItems.map((item) => {
          const qty = cart[item.id] ?? 0;
          return (
            <li key={item.id} className="flex items-center justify-between gap-2 py-2 sm:gap-3 sm:py-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground sm:text-base">{item.name}</p>
                {item.description ? (
                  <p className="line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                ) : null}
                <p className="mt-0.5 text-[11px] font-medium text-foreground sm:mt-1 sm:text-sm">
                  {formatAmount(item.price)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {qty > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-sm text-foreground sm:h-8 sm:w-8"
                    >
                      −
                    </button>
                    <span className="w-3.5 text-center text-xs font-medium sm:w-4 sm:text-sm">
                      {qty}
                    </span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground transition-colors hover:opacity-90 sm:h-8 sm:w-8"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card px-2.5 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
          <div className="mx-auto flex max-w-lg items-center justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <p className="text-[11px] text-muted-foreground sm:text-sm">{cartCount} items</p>
              <p className="truncate text-xs font-semibold text-foreground sm:text-base">
                {formatAmount(cartTotal)}
              </p>
            </div>
            <Button
              className="!w-auto shrink-0 px-3 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm"
              onClick={handlePlaceOrder}
              disabled={submitting}
            >
              {isAddingToApprovedOrder ? "Add to order" : "Place order"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
