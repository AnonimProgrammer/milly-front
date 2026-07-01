"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "./AuthCard";
import { AuthDivider } from "./AuthDivider";
import { AuthLayout } from "./AuthLayout";
import { AuthPageFallback } from "./AuthPageFallback";
import { IntentBanner } from "./IntentBanner";
import { OAuthButtons } from "./OAuthButtons";
import { SignUpForm } from "./SignUpForm";

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");

  return (
    <AuthLayout>
      <AuthCard>
        <IntentBanner intent={intent} />
        <SignUpForm intent={intent} />
        <AuthDivider />
        <OAuthButtons />
      </AuthCard>
    </AuthLayout>
  );
}

export function SignUpPage() {
  return (
    <Suspense fallback={<AuthPageFallback />}>
      <SignUpPageContent />
    </Suspense>
  );
}
