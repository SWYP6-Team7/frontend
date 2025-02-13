import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<any> }) {
  console.log(await params, "check");
  return (
    <html lang="ko">
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
