// user 정보 호출

import { getJWTHeader } from '@/utils/user'
import axios from 'axios'
import { axiosInstance } from '.'

//
export async function getUser(userId: number, accessToken: string) {
  try {
    const response = await axiosInstance.get(`/api/user/${userId}`, {
      headers: getJWTHeader(accessToken)
    })
    const data = response.data
    return data
  } catch (error: any) {
    console.error(error)
  }
}

export const kakaoLogin = async () => {
  try {
    const response = await axiosInstance.get('/api/login/oauth/kakao', {
      maxRedirects: 0
    })

    if (response.headers.location) {
      window.location.href = response.headers.location
    }
  } catch (error: any) {
    if (error.response?.status === 302) {
      window.location.href = error.response.headers.location
    }
  }
}

export const googleLogin = async () => {
  try {
    const response = await axiosInstance.get('/api/login/oauth/google', {
      maxRedirects: 0
    })

    if (response.headers.location) {
      window.location.href = response.headers.location
    }
  } catch (error: any) {
    if (error.response?.status === 302) {
      window.location.href = error.response.headers.location
    }
  }
}

export const naverLogin = async () => {
  try {
    const response = await axiosInstance.get('/api/login/oauth/naver', {
      maxRedirects: 0
    })

    if (response.headers.location) {
      window.location.href = response.headers.location
    }
  } catch (error: any) {
    if (error.response?.status === 302) {
      window.location.href = error.response.headers.location
    }
  }
}

export async function checkEmail(email: string) {
  try {
    const response = await axiosInstance.get('/api/users-email', {
      params: { email: email }
    })
    console.log('response', response)
    return true
  } catch (error: any) {
    console.log(error)
    return false
  }
}

export const getToken = async (
  domain: 'naver' | 'kakao' | 'google',
  code: string,
  state: string
) => {
  try {
    const url =
      domain === 'kakao'
        ? `/api/login/oauth/kakao/callback`
        : domain === `google`
          ? `/api/login/oauth/google/callback`
          : `/api/login/oauth/naver/callback`
    const response = await axiosInstance.get(url, {
      params: {
        code,
        state
      }
    })

    const user = response.data

    return user
  } catch (error) {
    console.error('토큰 요청 실패:', error)
  }
}
