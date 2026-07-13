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
import { useRouter } from "next/navigation";
import { ApiError, clearSessionHandlers, isAccountInactiveError, isServiceUnavailable, setSessionHandlers } from "@/modules/shared/api";
import { continueWithGoogle, continueWithPassword, getCurrentUser, logout } from "../api/authApi";
import { attemptRefreshSession } from "../api/refreshSessionMutex";
import type { CurrentUser, PasswordProfile } from "../api/types";
import { isProtectedRoute } from "../utils/protectedRoutes";

export type AuthStatus = "loading" | "authenticated" | "anonymous" | "unavailable";

type AuthContextValue = {
  user: CurrentUser | null;
  status: AuthStatus;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profile: PasswordProfile) => Promise<void>;
  signInWithGoogle: (idToken: string, profile?: PasswordProfile) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const clearSession = useCallback(() => {
    setUser(null);
    setStatus("anonymous");
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setStatus("authenticated");
    } catch (error) {
      if (error instanceof ApiError && (error.status === 401 || isAccountInactiveError(error))) {
        clearSession();
        return;
      }

      if (isServiceUnavailable(error)) {
        setStatus("unavailable");
        return;
      }

      setStatus("unavailable");
    }
  }, [clearSession]);

  useEffect(() => {
    setSessionHandlers({
      refreshSession: attemptRefreshSession,
      onSessionExpired: () => {
        clearSession();
      },
    });

    return () => {
      clearSessionHandlers();
    };
  }, [clearSession]);

  useEffect(() => {
    void refreshUser();
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

  const signInWithGoogle = useCallback(
    async (idToken: string, profile?: PasswordProfile) => {
      await continueWithGoogle({ idToken, profile });
      await refreshUser();
    },
    [refreshUser],
  );

  const signOut = useCallback(async () => {
    try {
      await logout();
    } catch {
      // Clear local session even if the logout request fails.
    } finally {
      clearSession();

      if (typeof window !== "undefined" && isProtectedRoute(window.location.pathname)) {
        router.replace("/");
      }
    }
  }, [clearSession, router]);

  const value = useMemo(
    () => ({
      user,
      status,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      refreshUser,
    }),
    [user, status, signIn, signUp, signInWithGoogle, signOut, refreshUser],
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
