import { axiosInstance } from '@/api'
import { getSearch } from '@/api/search'
import { ISearchData } from '@/model/search'
import { searchStore } from '@/store/client/searchStore'
import {
  InfiniteData,
  QueryFunction,
  useInfiniteQuery
} from '@tanstack/react-query'
import { useEffect } from 'react'

interface UseSearchProps {
  keyword: string
  page?: number
  size?: number
}

const useSearch = ({ keyword, page = 0, size = 5 }: UseSearchProps) => {
  const { style } = searchStore()
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  } = useInfiniteQuery<
    ISearchData,
    Object,
    InfiniteData<ISearchData>,
    [_1: string, _2: string, tags: string[]]
  >({
    queryKey: ['search', keyword, style],
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.page.number + 1 === lastPage.page.totalPages) {
        return undefined
      } else {
        return lastPage?.page.number + 1
      }
    },
    queryFn: ({ pageParam }) => getSearch(pageParam as number, keyword, style),
    enabled: Boolean(keyword)
  })

  return {
    data: keyword === '' ? undefined : data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  }
}

export default useSearch
