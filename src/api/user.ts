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
