"use client";

import { useAuth } from "@/modules/auth";
import { GuestProfileCard } from "./GuestProfileCard";
import { ProfileForm } from "./ProfileForm";

export function ProfileSection() {
  const { user, status, updateProfile } = useAuth();

  if (status === "loading") {
    return <div className="h-48 w-full animate-pulse rounded-2xl bg-muted" />;
  }

  if (status !== "authenticated" || !user) {
    return <GuestProfileCard />;
  }

  return <ProfileForm user={user} updateProfile={updateProfile} />;
}
