import { axiosInstance } from '@/api'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

interface IContent {
  travelNumber: number
  title: string
  summary: string
  userNumber: number
  createdAt: string
  registerDue: string
  postStatus: string
}

interface ISort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface ISearchData {
  content: IContent[]
  pageable: {
    pageNumber: string
    pageSize: number
    sort: ISort
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  first: boolean
  size: number
  sort: ISort
  numberOfElements: number
  empty: boolean
}

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
  const { data, isLoading, error, fetchNextPage } = useInfiniteQuery<
    ISearchData,
    Object,
    InfiniteData<ISearchData>,
    [_1: string, _2: string, tags: string[]]
  >({
    queryKey: ['search', keyword, tags],
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage?.last) {
        return false
      } else {
        return lastPage?.pageable.pageNumber + 1
      }
    },
    queryFn: () => getSearch(page, tags)
  })

  return { data, isLoading, error, fetchNextPage }
}

export default useSearch
