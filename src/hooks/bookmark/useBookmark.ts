"use client";
import { getBookmark } from "@/api/bookmark";
import { IMyTripList } from "@/model/myTrip";
import { authStore } from "@/store/client/authStore";
import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";

export const useBookmark = () => {
  const { accessToken } = authStore();
  console.log("accessToken", accessToken);
  const { data, isLoading, error, fetchNextPage, refetch, isFetching, hasNextPage } = useInfiniteQuery<
    IMyTripList,
    Object,
    InfiniteData<IMyTripList>,
    [_1: string]
  >({
    queryKey: ["bookmarks"],
    queryFn: ({ pageParam }) => {
      console.log("accessToken2", accessToken);
      return getBookmark(pageParam as number, accessToken);
    },
    enabled: !!accessToken,

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages || lastPage.page?.totalPages === 0) {
        return undefined;
      } else {
        if (lastPage?.page?.number + 1 === 3) return undefined; //30개까지만 요청
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
