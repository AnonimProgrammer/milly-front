import Link from "next/link";

type BackButtonProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
};

const defaultLinkClassName =
  "inline-flex items-center gap-2.5 text-base text-zinc-500 hover:text-black transition-colors font-light";

const defaultIconClassName = "h-5 w-5";

function BackIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

export function BackButton({
  href = "/",
  onClick,
  className = defaultLinkClassName,
  iconClassName = defaultIconClassName,
}: BackButtonProps) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <BackIcon className={iconClassName} />
        Back
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      <BackIcon className={iconClassName} />
      Back
    </Link>
  );
}
