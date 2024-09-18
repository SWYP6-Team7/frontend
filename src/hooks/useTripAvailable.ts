import { axiosInstance } from '@/api'
import { getAvailableTrips } from '@/api/home'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useTripAvailable = () => {
  const data = useQuery({
    queryKey: ['availableTrips'],
    queryFn: () => {
      return getAvailableTrips()
    }
  })
  return data
}
