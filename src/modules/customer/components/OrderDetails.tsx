import type { OrderItem } from "@/modules/orders";
import { CollapsibleOrderItemList, formatAmount } from "@/modules/orders";

type OrderDetailsProps = {
  items: OrderItem[];
};

export function OrderDetails({ items }: OrderDetailsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Order details
      </h3>
      <CollapsibleOrderItemList
        items={items}
        listClassName="divide-y divide-border"
        itemClassName="flex items-center justify-between py-3"
        expandButtonClassName="mt-2 text-sm font-medium text-muted-foreground underline hover:text-foreground"
        renderItem={(item) => (
          <>
            <div>
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} × {formatAmount(item.price)}
              </p>
            </div>
            <p className="font-medium text-foreground">{formatAmount(item.price * item.quantity)}</p>
          </>
        )}
      />
    </div>
  );
}
