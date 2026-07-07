"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "./AuthCard";
import { AuthDivider } from "./AuthDivider";
import { AuthLayout } from "./AuthLayout";
import { AuthPageFallback } from "./AuthPageFallback";
import { IntentBanner } from "./IntentBanner";
import { OAuthButtons } from "./OAuthButtons";
import { RedirectIfAuthenticated } from "./RedirectIfAuthenticated";
import { SignUpForm } from "./SignUpForm";

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");

  return (
    <RedirectIfAuthenticated intent={intent}>
      <AuthLayout>
        <AuthCard>
          <IntentBanner intent={intent} />
          <SignUpForm intent={intent} />
          <AuthDivider />
          <OAuthButtons intent={intent} />
        </AuthCard>
      </AuthLayout>
    </RedirectIfAuthenticated>
  );
}

export function SignUpPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <SignUpPageContent />
    </Suspense>
  );
}
