import { getBookmark } from '@/api/home'
import { authStore } from '@/store/client/authStore'
import { useQuery } from '@tanstack/react-query'

export const useBookmark = (userId: string) => {
  const { accessToken } = authStore()
  const data = useQuery({
    // enabled: !!userId && !!accessToken, // userId와 accessToken이 존재할 때만 실행
    queryKey: ['bookmark'],
    queryFn: () => {
      return getBookmark(userId)
    }
  })

  return data
}
