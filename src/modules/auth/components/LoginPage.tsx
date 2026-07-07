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
import { SignInForm } from "./SignInForm";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");

  return (
    <RedirectIfAuthenticated intent={intent}>
      <AuthLayout>
        <AuthCard>
          <IntentBanner intent={intent} />
          <SignInForm intent={intent} />
          <AuthDivider />
          <OAuthButtons intent={intent} />
        </AuthCard>
      </AuthLayout>
    </RedirectIfAuthenticated>
  );
}

export function LoginPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}
