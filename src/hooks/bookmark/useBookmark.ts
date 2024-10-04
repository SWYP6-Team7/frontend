import { getBookmark } from '@/api/bookmark'
import { IMyTripList } from '@/model/myTrip'
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
    IMyTripList,
    Object,
    InfiniteData<IMyTripList>,
    [_1: string]
  >({
    queryKey: ['bookmarks'],
    queryFn: ({ pageParam }) => {
      return getBookmark(pageParam as number, accessToken!)
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined
      } else {
        if (lastPage?.page?.number + 1 === 3) return undefined //30개까지만 요청
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
