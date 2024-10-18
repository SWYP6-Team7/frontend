import { getUserProfile } from '@/api/home'
import { useQuery } from '@tanstack/react-query'

export const useUserProfile = (accessToken: string) => {
  const data = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => {
      return getUserProfile(accessToken)
    }
  })
  return data
}
