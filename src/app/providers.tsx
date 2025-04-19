"use client";
import QueryClientBoundary from "@/context/QueryClientBoundary";
import ErrorCatcher from "@/context/ErrorCatcher";
import { ReactNode } from "react";
import RootStyleRegistry from "./RootStyleRegistry";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { ViewTransitions } from "next-view-transitions";
import PageNavigationProvider from "@/context/PageNavigationProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalErrorBoundary>
      <ViewTransitions>
        <PageNavigationProvider>
          <QueryClientBoundary>
            <ErrorCatcher />

            <RootStyleRegistry>{children}</RootStyleRegistry>
          </QueryClientBoundary>
        </PageNavigationProvider>
      </ViewTransitions>
    </GlobalErrorBoundary>
  );
}
