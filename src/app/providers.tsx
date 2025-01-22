"use client";
import QueryClientBoundary from "@/context/QueryClientBoundary";
import ErrorCatcher from "@/context/ErrorCatcher";
import { ReactNode } from "react";
import RootStyleRegistry from "./RootStyleRegistry";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalErrorBoundary>
      <QueryClientBoundary>
        <ErrorCatcher />

        <RootStyleRegistry> {children}</RootStyleRegistry>
      </QueryClientBoundary>
    </GlobalErrorBoundary>
  );
}
