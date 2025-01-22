"use client";
import { getAvailableTrips, getRecommendationTrips } from "@/api/home";
import { ITripList } from "@/model/trip";
import { authStore } from "@/store/client/authStore";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";
import useAuth from "./user/useAuth";

export const useTripList = (sort: "recommend" | "recent") => {
  const { accessToken } = authStore();
  const {
    refreshTokenMutation: { isError: isRefreshTokenError, isSuccess: isRefreshTokenSuccess },
  } = useAuth();
  const queryKey = sort === "recommend" ? "tripRecommendation" : "availableTrips";
  const { data, isLoading, error, fetchNextPage, refetch, isFetching, hasNextPage } = useInfiniteQuery<
    ITripList,
    Object,
    InfiniteData<ITripList>,
    [_1: string]
  >({
    queryKey: [queryKey],
    enabled: isRefreshTokenError || isRefreshTokenSuccess,
    queryFn: ({ pageParam }) => {
      if (sort === "recent") {
        return getAvailableTrips(pageParam as number, accessToken);
      } else {
        return getRecommendationTrips(pageParam as number, accessToken);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined;
      } else {
        return lastPage?.page?.number + 1;
      }
    },
  });
  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
  };
};

// 홈화면 참가가능 여행 api 백엔드 연결 예정 주석 처리.
// useTripAvailable.ts
// export const useTripAvailable = () => {
//   const { userId, accessToken } = authStore()
//   console.log(!!userId && !!accessToken, '유저 존재 확인!!')

//   const data = useQuery({
//     enabled: !!userId && !!accessToken, // userId와 accessToken이 존재할 때만 실행
//     queryKey: ['availableTrips'],
//     queryFn: () => {
//       return getAvailableTrips(accessToken!)
//     }
//   })
//   console.log(data)
//   return data
// }
