"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "./AuthCard";
import { AuthDivider } from "./AuthDivider";
import { AuthLayout } from "./AuthLayout";
import { AuthPageFallback } from "./AuthPageFallback";
import { IntentBanner } from "./IntentBanner";
import { OAuthButtons } from "./OAuthButtons";
import { SignInForm } from "./SignInForm";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");

  return (
    <AuthLayout>
      <AuthCard>
        <IntentBanner intent={intent} />
        <SignInForm intent={intent} />
        <AuthDivider />
        <OAuthButtons />
      </AuthCard>
    </AuthLayout>
  );
}

export function LoginPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}
