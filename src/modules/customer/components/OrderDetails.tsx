import type { OrderItem } from "@/modules/orders";
import { CollapsibleOrderItemList, formatAmount } from "@/modules/orders";

type OrderDetailsProps = {
  items: OrderItem[];
};

export function OrderDetails({ items }: OrderDetailsProps) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground sm:text-sm">
        Order details
      </h3>
      <CollapsibleOrderItemList
        items={items}
        listClassName="divide-y divide-border"
        itemClassName="flex items-center justify-between gap-2 py-2 sm:gap-3 sm:py-3"
        expandButtonClassName="mt-1.5 text-xs font-medium text-muted-foreground underline hover:text-foreground sm:mt-2 sm:text-sm"
        renderItem={(item) => (
          <>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground sm:text-base">
                {item.name}
              </p>
              <p className="text-[11px] text-muted-foreground sm:text-sm">
                {item.quantity} × {formatAmount(item.price)}
              </p>
            </div>
            <p className="shrink-0 text-xs font-medium text-foreground sm:text-base">
              {formatAmount(item.price * item.quantity)}
            </p>
          </>
        )}
      />
    </div>
  );
}
