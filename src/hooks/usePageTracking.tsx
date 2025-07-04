"use client";

import { useEffect } from "react";
import { useAnalytics } from "@/context/AnalyticsProvider";

export const usePageTracking = (pageName?: string) => {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    if (pageName) {
      trackPageView(pageName);
    }
  }, [pageName, trackPageView]);
};
