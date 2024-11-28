import { deleteMyApplyTrips, getApplyTrips, getMyTrips } from '@/api/myTrip'
import { IMyTripList } from '@/model/myTrip'
import { ITripList } from '@/model/trip'
import { authStore } from '@/store/client/authStore'
import {
  useMutation,
  useQueryClient,
  useQuery,
  useInfiniteQuery,
  InfiniteData
} from '@tanstack/react-query'

export const useMyTrip = () => {
  const { accessToken } = authStore()

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
    queryKey: ['myTrips'],
    queryFn: ({ pageParam }) => {
      return getMyTrips(pageParam as number, accessToken!)
    },
    enabled: !!accessToken,
    retry: Boolean(accessToken),
    staleTime: 0,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (
        lastPage?.page?.number + 1 === lastPage?.page?.totalPages ||
        lastPage?.page?.totalPages === 0
      ) {
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
