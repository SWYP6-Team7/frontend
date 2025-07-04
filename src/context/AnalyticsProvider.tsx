"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { GA_TRACKING_ID, pageview, event } from "@/utils/gtag";

interface AnalyticsContextType {
  trackPageView: (pageName?: string) => void;
  trackClick: (elementName: string, additionalData?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 자동 페이지 뷰 추적
  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      pageview(url);
    }
  }, [pathname, searchParams]);

  const trackPageView = (pageName?: string) => {
    if (GA_TRACKING_ID) {
      const name = pageName || pathname.replace("/", "") || "home";
      event("page_view", {
        page_title: name,
        page_location: window.location.href,
        page_path: pathname,
      });
    }
  };

  const trackClick = (elementName: string, additionalData?: Record<string, any>) => {
    if (GA_TRACKING_ID) {
      event("click", {
        event_category: "engagement",
        event_label: elementName,
        page_path: pathname,
        ...additionalData,
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackPageView, trackClick }}>
      {/* Google Analytics Scripts */}
      {GA_TRACKING_ID && (
        <>
          <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};
