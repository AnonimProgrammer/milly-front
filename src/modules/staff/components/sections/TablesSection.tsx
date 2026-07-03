"use client";

import { useState } from "react";

type TablesSectionProps = {
  tables: string[];
  onAddTable: (table: string) => void;
  onRemoveTable: (table: string) => void;
};

export function TablesSection({
  tables,
  onAddTable,
  onRemoveTable,
}: TablesSectionProps) {
  const [newTable, setNewTable] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTable.trim()) return;

    // Standardize to e.g. "Table X" or just keep the input
    const formatted = newTable.toLowerCase().startsWith("table")
      ? newTable.trim()
      : `Table ${newTable.trim()}`;

    // Avoid duplicates
    if (tables.includes(formatted)) {
      alert("This table already exists!");
      return;
    }

    onAddTable(formatted);
    setNewTable("");
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Tables</h2>
        <p className="text-sm text-zinc-500 font-light mt-1">
          Manage restaurant tables. Each table gets its own QR code.
        </p>
      </div>

      {/* Add table form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={newTable}
          onChange={(e) => setNewTable(e.target.value)}
          placeholder="Table number (e.g. 9)"
          className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-black transition-all focus:border-black outline-none"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Add
        </button>
      </form>

      {/* Tables List */}
      <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white divide-y divide-zinc-100">
        {tables.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-xs text-zinc-400 font-light">No tables configured.</p>
          </div>
        ) : (
          tables.map((table) => (
            <div
              key={table}
              className="flex items-center justify-between px-6 py-4 text-sm font-medium text-black"
            >
              <span>{table}</span>
              <button
                type="button"
                onClick={() => onRemoveTable(table)}
                className="text-xs text-zinc-400 hover:text-black transition-colors cursor-pointer font-light"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
