"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { readReturnTo } from "@/modules/shared/navigation";
import { BrandBackNav } from "@/modules/shared/ui";

function AccountBackNavInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = readReturnTo(searchParams);

  return (
    <BrandBackNav
      onClick={() => {
        if (returnTo) {
          router.push(returnTo);
          return;
        }

        router.back();
      }}
    />
  );
}

export function AccountBackNav() {
  return (
    <Suspense fallback={<BrandBackNav href="/" />}>
      <AccountBackNavInner />
    </Suspense>
  );
}
