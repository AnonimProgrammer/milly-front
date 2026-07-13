import { BackButton } from "@/modules/shared/ui/BackButton";
import { MillyBrand } from "@/modules/shared/ui/MillyBrand";

type AdminBrandBackNavProps = {
  href?: string;
};

export function AdminBrandBackNav({ href = "/" }: AdminBrandBackNavProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <MillyBrand />
        <span className="rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-foreground sm:text-sm">
          Admin Console
        </span>
      </div>
      <BackButton href={href} />
    </div>
  );
}
