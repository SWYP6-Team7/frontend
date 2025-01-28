"use client";
import { getSearch } from "@/api/search";
import { ISearchData } from "@/model/search";
import { authStore } from "@/store/client/authStore";
import { searchStore } from "@/store/client/searchStore";
import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";

interface UseSearchProps {
  keyword: string;
  page?: number;
  size?: number;
}

export interface Filters {
  tags: string[];
  location: string[];
  gender: string[];
  sorting: string;
  person: string[];
  period: string[];
}

const useSearch = ({ keyword, page = 0, size = 5 }: UseSearchProps) => {
  const { style, place, gender, people, period, sort } = searchStore();
  const { accessToken, isGuestUser } = authStore();
  const queryClient = useQueryClient();
  const filters = {
    tags: style,
    sorting: sort,
    location: place,
    gender,
    person: people,
    period,
  };

  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery<
    ISearchData,
    Object,
    InfiniteData<ISearchData>,
    [_1: string]
  >({
    queryKey: ["search"],
    initialPageParam: 0,
    staleTime: 0,
    gcTime: 0,
    getNextPageParam: (lastPage) => {
      if (
        lastPage?.page?.number + 1 === lastPage.page?.totalPages ||
        lastPage.page?.totalPages === 0
      ) {
        return undefined;
      } else {
        return lastPage?.page?.number + 1;
      }
    },

    queryFn: ({ pageParam }) =>
      getSearch(pageParam as number, keyword, { ...filters }, accessToken),
    enabled: isGuestUser || !!accessToken,
  });
  const handleRefetchWithPage = async (page: number) => {
    await queryClient.refetchQueries({
      queryKey: ["search"],
      exact: true,
    });
  };

  console.log("data2", data);
  return {
    data: keyword === "" ? undefined : data,
    isLoading,
    error,
    handleRefetchWithPage,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
  };
};

export default useSearch;
