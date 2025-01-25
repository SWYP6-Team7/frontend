"use client";
import QueryClientBoundary from "@/context/QueryClientBoundary";
import ErrorCatcher from "@/context/ErrorCatcher";
import { ReactNode } from "react";
import RootStyleRegistry from "./RootStyleRegistry";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { ViewTransitions } from "next-view-transitions";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalErrorBoundary>
      <ViewTransitions>
        <QueryClientBoundary>
          <ErrorCatcher />

          <RootStyleRegistry> {children}</RootStyleRegistry>
        </QueryClientBoundary>
      </ViewTransitions>
    </GlobalErrorBoundary>
  );
}
