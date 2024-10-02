import { deleteMyApplyTrips, getApplyTrips, getMyTrips } from '@/api/myTrip'
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
    ITripList,
    Object,
    InfiniteData<ITripList>,
    [_1: string]
  >({
    queryKey: ['myApplyTrips'],
    queryFn: ({ pageParam }) => {
      return getApplyTrips(pageParam as number, accessToken!)
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

  const queryClient = useQueryClient()

  const { mutateAsync: deleteMyApplyTripsMutation } = useMutation({
    mutationFn: (travelNumber: number) => {
      return deleteMyApplyTrips(accessToken!, travelNumber)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myApplyTrips']
      })
    }
  })
  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
    deleteMyApplyTripsMutation
  }
}
