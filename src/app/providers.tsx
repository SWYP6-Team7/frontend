"use client";
import QueryClientBoundary from "@/context/QueryClientBoundary";
import ErrorCatcher from "@/context/ErrorCatcher";
import { ReactNode } from "react";
import RootStyleRegistry from "./RootStyleRegistry";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { ViewTransitions } from "next-view-transitions";
import PageNavigationProvider from "@/context/PageNavigationProvider";
import { AnalyticsProvider } from "@/context/AnalyticsProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalErrorBoundary>
      <AnalyticsProvider>
        <ViewTransitions>
          <PageNavigationProvider>
            <QueryClientBoundary>
              <ErrorCatcher />

              <RootStyleRegistry>{children}</RootStyleRegistry>
            </QueryClientBoundary>
          </PageNavigationProvider>
        </ViewTransitions>
      </AnalyticsProvider>
    </GlobalErrorBoundary>
  );
}
