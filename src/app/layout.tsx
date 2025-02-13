import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";
import { headers } from "next/headers";
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname") || "";
  return (
    <html lang="ko">
      <meta http-equiv="refresh" content={`20; url=https://example.com/${headerPathname}`}></meta>
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
