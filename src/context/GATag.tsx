"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const pageView = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export const event = (action: Gtag.EventNames, { event_category, event_label, value }: Gtag.EventParams) => {
  if (process.env.NODE_ENV === "development") return true;
  window.gtag("event", action, {
    event_category,
    event_label,
    value,
  });
  return true;
};

export const useGtag = () => {
  const pathname = usePathname();

  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;

    const handleRouteChange = (url: URL) => {
      pageView(url);
    };

    if (savedPathNameRef.current !== pathname) {
      handleRouteChange(new URL(pathname, window.location.origin));
      // Update REF
      savedPathNameRef.current = pathname;
    }
  }, [pathname]);
};
