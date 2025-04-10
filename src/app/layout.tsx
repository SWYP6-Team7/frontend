import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";
import { MSWComponent } from "@/context/MSWComponent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <MSWComponent />
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
