"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiError } from "@/modules/shared/api";
import { continueWithPassword, getCurrentUser } from "../api/authApi";
import type { CurrentUser, PasswordProfile } from "../api/types";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  user: CurrentUser | null;
  status: AuthStatus;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profile: PasswordProfile) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setStatus("authenticated");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setUser(null);
        setStatus("anonymous");
        return;
      }

      throw error;
    }
  }, []);

  useEffect(() => {
    void refreshUser().catch(() => {
      setUser(null);
      setStatus("anonymous");
    });
  }, [refreshUser]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      await continueWithPassword({ email, password });
      await refreshUser();
    },
    [refreshUser],
  );

  const signUp = useCallback(
    async (email: string, password: string, profile: PasswordProfile) => {
      await continueWithPassword({ email, password, profile });
      await refreshUser();
    },
    [refreshUser],
  );

  const value = useMemo(
    () => ({
      user,
      status,
      signIn,
      signUp,
      refreshUser,
    }),
    [user, status, signIn, signUp, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
