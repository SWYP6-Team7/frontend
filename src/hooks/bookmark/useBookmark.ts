import { getBookmark } from '@/api/bookmark'
import { authStore } from '@/store/client/authStore'
import { useQuery } from '@tanstack/react-query'

export const useBookmark = () => {
  const { accessToken } = authStore()
  const data = useQuery({
    enabled: !!accessToken, // userId와 accessToken이 존재할 때만 실행
    queryKey: ['bookmark'],
    queryFn: () => {
      return getBookmark(accessToken!)
    }
  })

  return data
}
