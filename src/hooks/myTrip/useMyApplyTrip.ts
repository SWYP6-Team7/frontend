import { deleteMyApplyTrips, getApplyTrips } from '@/api/myTrip'
import { IMyTripList } from '@/model/myTrip'
import { authStore } from '@/store/client/authStore'
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData
} from '@tanstack/react-query'

export const useMyApplyTrip = () => {
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
    queryKey: ['myApplyTrips'],
    queryFn: ({ pageParam }) => {
      return getApplyTrips(pageParam as number, accessToken!)
    },
    enabled: !!accessToken,
    retry: Boolean(accessToken),
    staleTime: 0,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (
        lastPage?.page?.number + 1 === lastPage?.page?.totalPages ||
        lastPage.page?.totalPages === 0
      ) {
        return undefined
      } else {
        if (lastPage?.page?.number + 1 === 3) return undefined //30개까지만 요청
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
