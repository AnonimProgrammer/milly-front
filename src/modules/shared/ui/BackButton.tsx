import Link from "next/link";

type BackButtonProps = {
  href?: string;
  className?: string;
  iconClassName?: string;
};

const defaultLinkClassName =
  "inline-flex items-center gap-2.5 text-base text-zinc-500 hover:text-black transition-colors font-light";

const defaultIconClassName = "h-5 w-5";

export function BackButton({
  href = "/",
  className = defaultLinkClassName,
  iconClassName = defaultIconClassName,
}: BackButtonProps) {
  return (
    <Link href={href} className={className}>
      <svg className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back
    </Link>
  );
}
