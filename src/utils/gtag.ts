export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = (action: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, parameters);
  }
};
