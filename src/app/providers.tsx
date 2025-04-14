"use client";
import QueryClientBoundary from "@/context/QueryClientBoundary";
import ErrorCatcher from "@/context/ErrorCatcher";
import { ReactNode } from "react";
import RootStyleRegistry from "./RootStyleRegistry";
import { GlobalErrorBoundary } from "@/components/errorHandling/GlobalErrorBoundary";
import { ViewTransitions } from "next-view-transitions";
import PageNavigationProvider from "@/context/PageNavigationProvider";
import AutoRefresh from "@/context/AutoRefresh";
import GoogleAnalytics from "@/context/GoogleAnalytics";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GlobalErrorBoundary>
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
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
