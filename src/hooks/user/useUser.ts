import { getUser } from '@/api/user'
import { authStore } from '@/store/client/authStore'
import { generateUserKey, getJWTHeader } from '@/utils/user'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// reqct-query를 통해 user정보가 필요한 곳에서 호출할 수 있는 커스텀 훅
const useUser = () => {
  const queryClient = useQueryClient()

  const { userId, accessToken } = authStore()

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    enabled: !!userId && !!accessToken, // userId와 accessToken이 존재할 때만 실행
    queryKey: userId && accessToken ? generateUserKey(userId, accessToken) : [], // 쿼리 키 설정
    queryFn: () => {
      if (!userId || !accessToken) {
        // userId나 accessToken이 없으면 요청하지 않음
        return Promise.reject(new Error('User ID or access token is missing.'))
      }
      return getUser(userId, accessToken)
    },

    // 가비지 타임 전에는 항상 fresh 상태로 유지
    staleTime: Infinity
  })

  function updateUser(newUser: {
    userId: number
    name: string
    token: string
  }): void {
    queryClient.setQueryData(
      generateUserKey(newUser.userId, newUser.token),
      newUser
    )
  }

  function clearUser() {
    queryClient.removeQueries({ queryKey: ['user'] })
  }

  return { user, updateUser, clearUser, isLoading }
}

export default useUser
