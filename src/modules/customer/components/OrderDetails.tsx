import type { OrderItem } from "@/modules/orders";
import { formatAmount } from "@/modules/orders";

type OrderDetailsProps = {
  items: OrderItem[];
};

export function OrderDetails({ items }: OrderDetailsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Order details
      </h3>
      <ul className="divide-y divide-neutral-200">
        {items.map((item) => (
          <li
            key={`${item.menuItemId}-${item.name}`}
            className="flex items-center justify-between py-3"
          >
            <div>
              <p className="font-medium text-black">{item.name}</p>
              <p className="text-sm text-neutral-500">
                {item.quantity} × {formatAmount(item.price)}
              </p>
            </div>
            <p className="font-medium text-black">
              {formatAmount(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
