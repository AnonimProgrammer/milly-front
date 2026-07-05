"use client";

import type { ReactNode } from "react";
import { GlobalLoadingIndicator } from "./GlobalLoadingIndicator";
import { ToastContainer } from "./ToastContainer";

type FeedbackProviderProps = {
  children: ReactNode;
};

export function FeedbackProvider({ children }: FeedbackProviderProps) {
  return (
    <>
      {children}
      <GlobalLoadingIndicator />
      <ToastContainer />
    </>
  );
}
