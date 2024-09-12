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

export const getKakaoToken = async (code: string) => {
  try {
    const response = await axios.post('/api/kakao/oauth', {
      code
    })

    const user = response.data

    return user
  } catch (error) {
    console.error('토큰 요청 실패:', error)
  }
}
