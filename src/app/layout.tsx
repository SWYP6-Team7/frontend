import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";
import { MSWComponent } from "@/context/MSWComponent";
import UserProfileOverlay from "@/components/userProfile/UserProfileOverlay";
import GoogleAnalytics from "@/context/GoogleAnalytics";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <MSWComponent />
          <UserProfileOverlay />
          <GoogleAnalytics />

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
