import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { ITripList } from '@/model/trip'
import { daysAgo } from '@/utils/time'
import dayjs from 'dayjs'
import RequestError from '@/context/ReqeustError'

export const getUserProfile = (accessToken: string) => {
  return axiosInstance.get(`/api/profile/me?userNumber=${accessToken}`)
}

export const getAvailableTrips = async (
  pageParams: number,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.get('/api/travels/recent', {
      params: {
        page: pageParams,
        size: 10
      },
      headers: getJWTHeader(accessToken)
    })

    return response.data
  } catch (err: any) {
    throw new RequestError(err)
  }
}

//api/home.ts
// 홈화면 참가가능 여행 api 백엔드 연결 예정 주석 처리.
// export const getAvailableTrips = (accessToken: string) => {
//   // const { accessToken } = authStore()
//   return axiosInstance.get('/api/travels/recent', {
//     headers: getJWTHeader(accessToken)
//   })
// }

export const getRecommendationTrips = async (
  pageParams: number,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.get('/api/travels/recommend', {
      params: {
        page: pageParams,
        size: 10
      },
      headers: getJWTHeader(accessToken)
    })

    return response.data
  } catch (err: any) {
    throw new RequestError(err)
  }
}

//api/home.ts
// 홈화면 추천 여행 api 백엔드 연결 예정 주석 처리.
// export const getRecommendationTrips = (accessToken: string) => {
//   // const { accessToken } = authStore()
//   return axiosInstance.get('/api/travels/recommend', {
//     headers: getJWTHeader(accessToken)
//   })
// }
