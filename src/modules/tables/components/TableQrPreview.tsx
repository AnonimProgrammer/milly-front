import Link from "next/link";
import { surfaceCard, textMuted } from "@/modules/shared/theme/classNames";
import type { VenueTable } from "../types";

type TableQrPreviewProps = {
  table: VenueTable;
};

export function TableQrPreview({ table }: TableQrPreviewProps) {
  const customerUrl = `/table/${table.id}`;
  const hasQr = Boolean(table.qrImageUrl);

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <div className={`flex h-[180px] w-[180px] items-center justify-center p-4 shadow-sm ${surfaceCard}`}>
        {hasQr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={table.qrImageUrl!}
            alt={`QR code for ${table.label}`}
            width={180}
            height={180}
            className="h-full w-full object-contain"
          />
        ) : (
          <p className={`px-2 text-center text-sm font-light ${textMuted}`}>
            Generated QR will be displayed here
          </p>
        )}
      </div>

      <Link
        href={customerUrl}
        className={`break-all text-center font-mono text-xs underline-offset-2 hover:text-foreground hover:underline ${textMuted}`}
      >
        {customerUrl}
      </Link>
    </div>
  );
}
