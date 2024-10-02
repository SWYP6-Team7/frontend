import {
  deleteTripDetail,
  getCompanions,
  getTripDetail,
  updateTripDetail
} from '@/api/tripDetail'
import { ITripDetail } from '@/model/tripDetail'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useTripDetail = (travelNumber: number) => {
  const { userId, accessToken } = authStore()
  const queryClient = useQueryClient()
  const tripDetail = useQuery({
    queryKey: ['tripDetail', travelNumber],
    queryFn: () => getTripDetail(travelNumber, accessToken),
    enabled: !!travelNumber && !!accessToken
  })

  const companions = useQuery({
    queryKey: ['companions', travelNumber],
    queryFn: () => getCompanions(travelNumber, accessToken),
    enabled: !!travelNumber && !!accessToken
  })

  const { mutateAsync: updateTripDetailMutation, isSuccess: isEditSuccess } =
    useMutation({
      mutationFn: (data: ITripDetail) => {
        return updateTripDetail(travelNumber, data, accessToken)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['tripDetail', travelNumber]
        })
      }
    })

  const { mutateAsync: deleteTripDetailMutation } = useMutation({
    mutationFn: () => {
      return deleteTripDetail(travelNumber, accessToken)
    },
    onSuccess: () => {
      // 내가 만든 여행을 내 여행에서 삭제 가능하므로, 삭제시 무효화시킴.
      queryClient.invalidateQueries({
        queryKey: ['tripDetail', travelNumber]
      }),
        queryClient.invalidateQueries({
          queryKey: ['myTrips']
        })
    }
  })

  return {
    tripDetail,
    isEditSuccess,
    updateTripDetailMutation,
    deleteTripDetailMutation,
    companions
  }
}

export default useTripDetail
