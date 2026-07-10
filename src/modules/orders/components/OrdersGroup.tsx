import type { ReactNode } from "react";

type OrdersGroupProps = {
  title: string;
  count: number;
  emptyMessage: string;
  children: ReactNode;
};

export function OrdersGroup({ title, count, emptyMessage, children }: OrdersGroupProps) {
  return (
    <section className="min-w-0 lg:px-5 first:lg:pl-0 last:lg:pr-0">
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <span className="text-base text-muted-foreground">{count}</span>
      </div>
      {count > 0 ? (
        <ul className="space-y-5">{children}</ul>
      ) : (
        <div className="rounded-2xl border border-border px-6 py-10 text-center text-base text-muted-foreground">
          {emptyMessage}
        </div>
      )}
    </section>
  );
}
