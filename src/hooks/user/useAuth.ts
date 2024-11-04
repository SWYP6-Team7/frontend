import { authStore } from '@/store/client/authStore'

import { axiosInstance } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import RequestError from '@/context/ReqeustError'

interface IRegisterEmail {
  email: string
  password: string
  name: string
  gender: string

  agegroup: string
  // DB에서 현재 제외된 상태.
  // introduce: 'string'
  preferredTags: string[]
}

// 로그인, 로그아웃, 이메일회원가입까지 구현
// 인증 부분을 처리하는 커스텀 훅

function checkNetworkConnection() {
  if (!navigator.onLine) {
    console.log('offline network')
    return false
  }
  return true
}
const useAuth = () => {
  const queryClient = useQueryClient()
  const { setLoginData, clearLoginData, accessToken, resetData } = authStore()

  const loginEmailMutation = useMutation({
    mutationFn: async ({
      email,
      password
    }: {
      email: string
      password: string
    }) => {
      if (!checkNetworkConnection()) return

      const response = await axiosInstance.post(
        '/api/login',
        { email, password },
        { withCredentials: true }
      )
      return response.data
    },
    onSuccess: data => {
      setLoginData({
        userId: Number(data.userId),
        accessToken: data.accessToken
      })
    },
    onError: (error: any) => {
      console.error(error)
      throw new RequestError(error)
    }
  })

  const registerEmailMutation = useMutation({
    mutationFn: async (formData: IRegisterEmail) => {
      if (!checkNetworkConnection()) return

      const response = await axiosInstance.post('/api/users/new', formData, {
        withCredentials: true
      })
      return response.data
    },
    onSuccess: data => {
      setLoginData({
        userId: Number(data.userNumber),
        accessToken: data.accessToken
      })
    },
    onError: (error: any) => {
      console.error(error)
      throw new RequestError(error)
    }
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!checkNetworkConnection()) return

      return await axiosInstance.post('/api/logout', {})
    },
    onSuccess: () => {
      clearLoginData()
      resetData()
      queryClient.clear()
    },
    onError: (error: any) => {
      console.error(error)
      throw new RequestError(error)
    }
  })

  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/api/token/refresh', {})
      return response.data
    },
    onSuccess: data => {
      setLoginData({
        userId: Number(data.userId),
        accessToken: data.accessToken
      })
    },
    onError: (error: any) => {
      console.error(error)
      throw new RequestError(error)
    }
  })

  return {
    loginEmail: loginEmailMutation.mutate,
    registerEmail: registerEmailMutation.mutate,
    logout: logoutMutation.mutate,
    userPostRefreshToken: refreshTokenMutation.mutate,

    loginEmailMutation,
    registerEmailMutation,
    logoutMutation,
    refreshTokenMutation
  }
}

export default useAuth
