import { authStore } from '@/store/client/authStore'
import useUser from './useUser'
import { axiosInstance } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getJWTHeader } from '@/utils/user'
import { useNavigate } from 'react-router-dom'

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
const useAuth = () => {
  const { setLoginData, clearLoginData, accessToken, resetData } = authStore()

  async function loginEmail({
    email,
    password
  }: {
    email: string
    password: string
  }): Promise<void> {
    try {
      const response = await axiosInstance.post(
        '/api/login',
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      )
      const data = response.data

      setLoginData({
        userId: Number(response.data.userId),
        accessToken: data.accessToken
      })
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }
  async function registerEmail(formData: IRegisterEmail): Promise<void> {
    try {
      const response = await axiosInstance.post('/api/users/new', formData, {
        withCredentials: true
      })
      const data = response.data

      setLoginData({
        userId: Number(response.data.userId),
        accessToken: data.accessToken
      })
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  async function logout(): Promise<void> {
    try {
      await axiosInstance.post(
        '/api/logout',
        {},
        {
          headers: getJWTHeader(accessToken!)
        }
      )
      clearLoginData()
      resetData()
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  // 유저가 로그인을 했는지 & 새로고침을 해도 accessToken을 유지하도록 하는 refresh 요청 api
  async function userPostRefreshToken(): Promise<void> {
    try {
      const response = await axiosInstance.post(
        '/api/token/refresh',
        {},
        {
          withCredentials: true
        }
      )
      const data = response.data

      setLoginData({
        userId: Number(data.userId),
        accessToken: data.accessToken
      })
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    }
  }

  return {
    loginEmail,
    registerEmail,
    logout,
    userPostRefreshToken
  }
}

export default useAuth
