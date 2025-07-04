import { useCallback } from "react";
import { useAnalytics } from "@/context/AnalyticsProvider";

export const useClickTracking = () => {
  const { trackClick } = useAnalytics();

  const track = useCallback(
    (elementName: string, additionalData?: Record<string, any>) => {
      trackClick(elementName, additionalData);
    },
    [trackClick]
  );

  return { track };
};
