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

export interface Filters {
  tags: string[]
  location: string[]
  gender: string[]
  person: string[]
  period: string[]
}

const useSearch = ({ keyword, page = 0, size = 5 }: UseSearchProps) => {
  const { style, place, gender, people, period } = searchStore()
  const filters = {
    tags: style,
    location: place,
    gender,
    person: people,
    period
  }
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
    [_1: string, _2: string, filters: Filters]
  >({
    queryKey: ['search', keyword, { ...filters }],
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.page.number + 1 === lastPage.page.totalPages) {
        return undefined
      } else {
        return lastPage?.page.number + 1
      }
    },
    queryFn: ({ pageParam }) =>
      getSearch(pageParam as number, keyword, { ...filters }),
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
