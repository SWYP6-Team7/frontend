import { axiosInstance } from '@/api'
import { createTrip } from '@/api/trip'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
interface CreateTripReqData {
  location: string
  title: string
  details: string
  maxPerson: number
  genderType: string
  dueDate: string
  periodType: string
  tags: string[]
  completionStatus: boolean
}
export const useCreateTrip = (
  travelData: CreateTripReqData,
  accessToken: string
) => {
  const queryClient = useQueryClient()
  const { mutateAsync: createTripMutate } = useMutation({
    mutationFn: () => {
      return createTrip(travelData, accessToken)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['createTrip']
      })
    }
  })
  return { createTripMutate }
}
