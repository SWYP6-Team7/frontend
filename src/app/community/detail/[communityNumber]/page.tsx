import DetailCommunity from "@/page/Community/DetailCommunity";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { getCommunity, getImages } from "@/api/community";

type Props = {
  params: Promise<{ communityNumber: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const communityNumber = (await params).communityNumber;

  // fetch data
  const community = await getCommunity(parseInt(communityNumber), null);
  const images = await getImages(parseInt(communityNumber), null);
  return {
    title: community?.title || "커뮤니티 상세보기",
    openGraph: {
      title: community?.title || "커뮤니티 상세보기",
      locale: "ko_KR",
      type: "website",
      images: {
        url: images ? images[0]?.url : "/images/logo_moing_white_bg.png",
        width: 1200,
        height: 630,
      },
    },
  };
}

const DetailPage = () => {
  return <DetailCommunity />;
};

export default DetailPage;
