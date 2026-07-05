import { BackButton } from "./BackButton";
import { MillyBrand } from "./MillyBrand";

type BrandBackNavProps = {
  href?: string;
};

export function BrandBackNav({ href }: BrandBackNavProps) {
  return (
    <div className="flex flex-col gap-5">
      <MillyBrand />
      <BackButton href={href} />
    </div>
  );
}
