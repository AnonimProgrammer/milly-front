"use client";

import { useState } from "react";

type QRSectionProps = {
  tables: string[];
};

function SVGQRCode() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 29 29"
      shapeRendering="crispEdges"
      className="text-black"
    >
      <rect width="29" height="29" fill="white" />
      {/* Corner Finder Pattern Top Left */}
      <rect x="0" y="0" width="7" height="7" fill="currentColor" />
      <rect x="1" y="1" width="5" height="5" fill="white" />
      <rect x="2" y="2" width="3" height="3" fill="currentColor" />

      {/* Corner Finder Pattern Top Right */}
      <rect x="22" y="0" width="7" height="7" fill="currentColor" />
      <rect x="23" y="1" width="5" height="5" fill="white" />
      <rect x="24" y="2" width="3" height="3" fill="currentColor" />

      {/* Corner Finder Pattern Bottom Left */}
      <rect x="0" y="22" width="7" height="7" fill="currentColor" />
      <rect x="1" y="23" width="5" height="5" fill="white" />
      <rect x="2" y="24" width="3" height="3" fill="currentColor" />

      {/* Small Alignment Pattern Bottom Right */}
      <rect x="20" y="20" width="5" height="5" fill="currentColor" />
      <rect x="21" y="21" width="3" height="3" fill="white" />
      <rect x="22" y="22" width="1" height="1" fill="currentColor" />

      {/* Pixelated mock noise */}
      <rect x="8" y="1" width="2" height="1" fill="currentColor" />
      <rect x="12" y="0" width="1" height="3" fill="currentColor" />
      <rect x="15" y="1" width="3" height="1" fill="currentColor" />
      <rect x="20" y="2" width="1" height="2" fill="currentColor" />
      
      <rect x="6" y="8" width="1" height="1" fill="currentColor" />
      <rect x="6" y="10" width="1" height="1" fill="currentColor" />
      <rect x="6" y="12" width="1" height="1" fill="currentColor" />
      <rect x="6" y="14" width="1" height="1" fill="currentColor" />
      <rect x="6" y="16" width="1" height="1" fill="currentColor" />
      <rect x="6" y="18" width="1" height="1" fill="currentColor" />
      <rect x="6" y="20" width="1" height="1" fill="currentColor" />
      
      <rect x="8" y="6" width="1" height="1" fill="currentColor" />
      <rect x="10" y="6" width="1" height="1" fill="currentColor" />
      <rect x="12" y="6" width="1" height="1" fill="currentColor" />
      <rect x="14" y="6" width="1" height="1" fill="currentColor" />
      <rect x="16" y="6" width="1" height="1" fill="currentColor" />
      <rect x="18" y="6" width="1" height="1" fill="currentColor" />
      <rect x="20" y="6" width="1" height="1" fill="currentColor" />

      <rect x="9" y="9" width="3" height="1" fill="currentColor" />
      <rect x="15" y="8" width="1" height="4" fill="currentColor" />
      <rect x="18" y="10" width="3" height="1" fill="currentColor" />
      <rect x="10" y="13" width="2" height="2" fill="currentColor" />
      <rect x="14" y="14" width="3" height="1" fill="currentColor" />
      <rect x="19" y="13" width="1" height="3" fill="currentColor" />
      <rect x="23" y="12" width="2" height="2" fill="currentColor" />
      <rect x="9" y="17" width="1" height="3" fill="currentColor" />
      <rect x="12" y="19" width="4" height="1" fill="currentColor" />
      <rect x="17" y="18" width="2" height="2" fill="currentColor" />
      <rect x="25" y="17" width="2" height="1" fill="currentColor" />
      <rect x="11" y="22" width="2" height="3" fill="currentColor" />
      <rect x="15" y="24" width="3" height="1" fill="currentColor" />
      <rect x="8" y="26" width="2" height="2" fill="currentColor" />
      <rect x="14" y="27" width="4" height="1" fill="currentColor" />
      <rect x="20" y="26" width="2" height="1" fill="currentColor" />
      <rect x="24" y="25" width="3" height="2" fill="currentColor" />
    </svg>
  );
}

export function QRSection({ tables }: QRSectionProps) {
  const [selectedTableOverride, setSelectedTableOverride] = useState<string | null>(null);

  // Derive selection during rendering to avoid useEffect and cascading renders
  const selectedTable = selectedTableOverride && tables.includes(selectedTableOverride)
    ? selectedTableOverride
    : tables[0] || "";

  // Extract the table ID (digits only) or fallback
  const tableIdNumber = selectedTable.replace(/\D/g, "") || "1";
  const customerUrl = `https://milly-mvp-demo.vercel.app/table/${tableIdNumber}`;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight">QR Codes</h2>
        <p className="text-sm text-zinc-500 font-light mt-1">
          Generate QR codes for tables. Customers scan these to open the menu.
        </p>
      </div>

      {tables.length === 0 ? (
        <div className="border border-dashed border-zinc-200 rounded-2xl p-12 text-center bg-zinc-50/50">
          <p className="text-sm text-zinc-500 font-light">
            Please add tables in the Tables tab first to generate QR codes.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="qr-table-select" className="text-xs font-semibold text-zinc-500 uppercase">
              Select table
            </label>
            <select
              id="qr-table-select"
              value={selectedTable}
              onChange={(e) => setSelectedTableOverride(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm text-black outline-none focus:border-black transition-all cursor-pointer"
            >
              {tables.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>

          {/* QR Code Presentation Card */}
          <div className="border border-zinc-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-5 bg-white shadow-sm">
            <div className="p-4 border border-zinc-100 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              <SVGQRCode />
            </div>

            <div className="text-center flex flex-col gap-1">
              <span className="font-bold text-base text-black">
                {selectedTable}
              </span>
              <span className="text-xs text-zinc-400 font-mono tracking-tight break-all">
                {customerUrl}
              </span>
            </div>

            <a
              href={`/table/${tableIdNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-black border-b border-black pb-0.5 hover:opacity-75 transition-opacity"
            >
              Open customer view
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
