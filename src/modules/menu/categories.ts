export const MENU_CATEGORIES = ["Starters", "Mains", "Drinks", "Desserts"] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];

export function getCategoriesFromMenu(menuItems: { category: string }[]): string[] {
  const categories = new Set(menuItems.map((item) => item.category));
  const ordered = MENU_CATEGORIES.filter((category) => categories.has(category));
  const extras = Array.from(categories)
    .filter((category) => !MENU_CATEGORIES.includes(category as MenuCategory))
    .sort();

  return ["All", ...ordered, ...extras];
}
