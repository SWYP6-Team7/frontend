import { deleteMyApplyTrips, getApplyTrips, getMyTrips } from '@/api/myTrip'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

export const useMyTrip = () => {
  const { accessToken } = authStore()

  const myTrips = useQuery({
    enabled: !!accessToken,
    queryKey: ['myTrips'],
    queryFn: () => {
      return getMyTrips(accessToken!)
    }
  })

  const queryClient = useQueryClient()
  const myApplyTrips = useQuery({
    enabled: !!accessToken,
    queryKey: ['myApplyTrips'],
    queryFn: () => {
      return getApplyTrips(accessToken!)
    }
  })

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

  return { myTrips, myApplyTrips, deleteMyApplyTripsMutation }
}
