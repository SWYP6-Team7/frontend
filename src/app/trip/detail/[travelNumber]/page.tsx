import { getTripDetail } from "@/api/tripDetail";
import TripDetail from "@/page/TripDetail/TripDetail";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ travelNumber: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const travelNumber = (await params).travelNumber;

  // fetch data
  const tripDetail = await getTripDetail(parseInt(travelNumber), null);

  return {
    title: tripDetail.data?.data?.title || "여행 상세보기",
  };
}

const TripDetailPage = async ({ params }: { params: { travelNumber: string } }) => {
  const travelNumber = params.travelNumber;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tripDetail", travelNumber],
    queryFn: async () => {
      const data = await getTripDetail(parseInt(travelNumber), null);
      return JSON.parse(JSON.stringify(data));
    },
  });
  const dehydratedstate = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedstate}>
      <TripDetail />
    </HydrationBoundary>
  );
};

export default TripDetailPage;
