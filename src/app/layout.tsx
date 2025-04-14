import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";
import { MSWComponent } from "@/context/MSWComponent";
import { GoogleAnalytics } from "@next/third-parties/google";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <MSWComponent />
          {/* <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS || ""} /> */}
          <Layout>{children}</Layout>
          <div id="checking-modal" />
          <div id="trip-toast" />
          <div id="result-toast" />
          <div id="end-modal" />
          <div id="region-modal" />
        </Providers>
      </body>
    </html>
  );
}
