type CustomerTablePageProps = {
  tableId: string;
};

export function CustomerTablePage({ tableId }: CustomerTablePageProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Table {tableId}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Customer flow: menu → pending → bill — to be implemented.
      </p>
    </main>
  );
}
