import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <meta http-equiv="refresh" content="20"></meta>
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <div id="checking-modal" />
          <div id="end-modal" />
        </Providers>
      </body>
    </html>
  );
}
