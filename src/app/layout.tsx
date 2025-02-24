import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <div id="checking-modal" />
          <div id="result-toast" />
          <div id="end-modal" />
        </Providers>
      </body>
    </html>
  );
}
