import { getBookmark } from '@/api/bookmark'
import { ITripList } from '@/model/trip'
import { authStore } from '@/store/client/authStore'
import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
  InfiniteData
} from '@tanstack/react-query'
import axios from 'axios'

export const useBookmark = () => {
  const { userId, accessToken } = authStore()
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  } = useInfiniteQuery<
    ITripList,
    Object,
    InfiniteData<ITripList>,
    [_1: string]
  >({
    queryKey: ['bookmarks'],
    queryFn: ({ pageParam }) => {
      return getBookmark(pageParam as number, accessToken!)
    },

    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined
      } else {
        return lastPage?.page?.number + 1
      }
    }
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
