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
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <span className="text-base text-zinc-400">{count}</span>
      </div>
      {count > 0 ? (
        <ul className="space-y-5">{children}</ul>
      ) : (
        <div className="rounded-2xl border border-zinc-200 px-6 py-10 text-center text-base text-zinc-500">
          {emptyMessage}
        </div>
      )}
    </section>
  );
}
