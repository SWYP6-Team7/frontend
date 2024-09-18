import { axiosInstance } from '@/api'
import { ISearchData } from '@/model/search'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface UseSearchProps {
  keyword: string
  page?: number
  size?: number
  tags: string[]
}

async function getSearch(pageParams: number, tags: string[]) {
  console.log('getSerach')
  const response = await axiosInstance.get('/api/travel/search', {
    params: {
      page: pageParams,
      tags: tags.join(',')
    }
  })
  return response.data as ISearchData
}
const useSearch = ({ keyword, page = 0, size = 5, tags }: UseSearchProps) => {
  const { data, isLoading, error, fetchNextPage, refetch } = useInfiniteQuery<
    ISearchData,
    Object,
    InfiniteData<ISearchData>,
    [_1: string, _2: string, tags: string[]]
  >({
    queryKey: ['search', keyword, tags],
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage && lastPage?.last) {
        return false
      } else {
        return lastPage?.pageable.pageNumber + 1
      }
    },
    queryFn: () => getSearch(page, tags),
    enabled: Boolean(keyword)
  })

  return { data, isLoading, error, fetchNextPage, refetch }
}

export default useSearch
