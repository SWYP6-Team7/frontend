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
  const filters = {
    tags: style,
    sorting: sort,
    location: place,
    gender,
    person: people,
    period,
  };

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
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ["search", keyword, JSON.stringify(filters)],
    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined;
      } else {
        return lastPage?.page?.number + 1;
      }
    },
    queryFn: async ({ pageParam }) => {
      const result = await getSearch(
        pageParam as number,
        keyword,
        { ...filters },
        accessToken
      );

      return result;
    },

    enabled: isGuestUser || !!accessToken,
    retry: !!accessToken,
  });
  return {
    data: keyword === "" ? undefined : data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
  };
};

export default useSearch;
