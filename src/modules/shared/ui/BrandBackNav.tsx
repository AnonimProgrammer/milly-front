import { BackButton } from "./BackButton";
import { MillyBrand } from "./MillyBrand";

type BrandBackNavProps = {
  href?: string;
  onClick?: () => void;
};

export function BrandBackNav({ href, onClick }: BrandBackNavProps) {
  return (
    <div className="flex flex-col gap-5">
      <MillyBrand />
      <BackButton href={href} onClick={onClick} />
    </div>
  );
}
