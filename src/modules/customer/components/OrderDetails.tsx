import type { OrderItem } from "@/modules/orders";
import { CollapsibleOrderItemList, formatAmount } from "@/modules/orders";

type OrderDetailsProps = {
  items: OrderItem[];
};

export function OrderDetails({ items }: OrderDetailsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
        Order details
      </h3>
      <CollapsibleOrderItemList
        items={items}
        listClassName="divide-y divide-neutral-200"
        itemClassName="flex items-center justify-between py-3"
        expandButtonClassName="mt-2 text-sm font-medium text-neutral-500 underline hover:text-neutral-700"
        renderItem={(item) => (
          <>
            <div>
              <p className="font-medium text-black">{item.name}</p>
              <p className="text-sm text-neutral-500">
                {item.quantity} × {formatAmount(item.price)}
              </p>
            </div>
            <p className="font-medium text-black">{formatAmount(item.price * item.quantity)}</p>
          </>
        )}
      />
    </div>
  );
}
