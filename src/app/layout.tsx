import Layout from "@/components/Layout";
import Providers from "./providers";
import "./globals.css";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
export async function generateMetadata(_: Promise<{ locale: string }>, parent: ResolvingMetadata): Promise<Metadata> {
  const headersList = headers();
  const pathname = new URL((await parent).alternates?.canonical?.url!).pathname;
  const fullUrl = `${process.env.FRONT_URL || "https://www.moing.io"}${pathname}`; // 실제 도메인으로 변경하세요

  return {
    metadataBase: new URL(process.env.FRONT_URL || "https://www.moing.io"),
    alternates: {
      canonical: "./",
    },
    other: {
      refresh: `595; url=${fullUrl}`,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
