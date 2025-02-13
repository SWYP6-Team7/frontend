import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";
import { getPathname } from "@nimpl/getters/get-pathname";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = getPathname();
  console.log(pathname, "pathname");
  return (
    <html lang="ko">
      <meta http-equiv="refresh" content={`20; url=${process.env.FRONT_URL}${pathname ?? "/"}`}></meta>
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
