import type { Metadata } from "next";
import Link from "next/link";
import { BrandBackNav, PageHeader } from "@/modules/shared/ui";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-transparent p-6 font-sans text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      <PageHeader leading={<BrandBackNav href="/" />} />

      <div className="z-10 flex flex-1 flex-col items-center justify-center py-10 text-center">
        <p className="text-6xl font-light tracking-tight text-foreground sm:text-7xl">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground sm:text-2xl">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
