import { getTripDetail } from "@/api/tripDetail";
import TripDetail from "@/page/TripDetail/TripDetail";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const TripDetailPage = async ({ params }: { params: Promise<{ travelNumber: string }> }) => {
  const travelNumber = (await params).travelNumber;
  const queryClient = new QueryClient();

  // 첫 페이지만 프리패치
  await queryClient.prefetchQuery({
    queryKey: ["tripDetail", travelNumber],
    queryFn: () => getTripDetail(parseInt(travelNumber), null),
  });
  const data = queryClient.getQueryData(["tripDetail", travelNumber]);
  console.log(data, "data");
  const dehydratedstate = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedstate}>
      <TripDetail />
    </HydrationBoundary>
  );
};

export default TripDetailPage;
