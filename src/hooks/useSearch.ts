import { axiosInstance } from '@/api'
import { ISearchData } from '@/model/search'
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
  tags: string[]
}

async function getSearch(pageParams: number, tags: string[]) {
  const response = await axiosInstance.get('/api/travel/search', {
    params: {
      page: pageParams,
      tags: tags.join(',')
    }
  })
  return response.data as ISearchData
}
const useSearch = ({ keyword, page = 0, size = 5, tags }: UseSearchProps) => {
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
    queryKey: ['search', keyword, tags],
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage && lastPage?.last) {
        return undefined
      } else {
        return lastPage?.pageable.pageNumber + 1
      }
    },
    queryFn: ({ pageParam }) => getSearch(pageParam as number, tags),
    enabled: Boolean(keyword)
  })

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  }
}

export default useSearch
