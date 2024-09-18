import { getRecommendationTrips } from '@/api/home'
import { useQuery } from '@tanstack/react-query'

export const useTripRecommendation = () => {
  const data = useQuery({
    queryKey: ['tripRecommendation'],
    queryFn: () => {
      return getRecommendationTrips()
    }
  })
  return data
}
