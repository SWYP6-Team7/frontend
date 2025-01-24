import { getTripDetail } from "@/api/tripDetail";
import TripDetail from "@/page/TripDetail/TripDetail";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const TripDetailPage = async ({ params }: { params: { travelNumber: string } }) => {
  // const travelNumber = params.travelNumber;
  // const queryClient = new QueryClient();

  // // 첫 페이지만 프리패치
  // await queryClient.prefetchQuery({
  //   queryKey: ["tripDetail", travelNumber],
  //   queryFn: () => {
  //     const data = getTripDetail(parseInt(travelNumber), null);
  //     return JSON.parse(JSON.stringify(data));
  //   },
  // });
  // const dehydratedstate = dehydrate(queryClient);
  return (
    // <HydrationBoundary state={dehydratedstate}>
    <TripDetail />
    //</HydrationBoundary>
  );
};

export default TripDetailPage;
