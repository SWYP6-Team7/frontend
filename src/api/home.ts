import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export const getUserProfile = (accessToken: string) => {
  return axiosInstance.get(`/api/profile/me?userNumber=${accessToken}`)
}

export const getAvailableTrips = async (pageParams: number) => {
  const response = await axiosInstance.get('/api/travels/recent', {
    params: {
      page: pageParams,
      size: 10
    }
  })
  return response.data
}

//api/home.ts
// 홈화면 참가가능 여행 api 백엔드 연결 예정 주석 처리.
// export const getAvailableTrips = (accessToken: string) => {
//   // const { accessToken } = authStore()
//   return axiosInstance.get('/api/travels/recent', {
//     headers: getJWTHeader(accessToken)
//   })
// }

export const getRecommendationTrips = async (pageParams: number) => {
  const response = await axiosInstance.get('/api/travels/recommend', {
    params: {
      page: pageParams,
      size: 10
    }
  })
  return response.data
}

//api/home.ts
// 홈화면 추천 여행 api 백엔드 연결 예정 주석 처리.
// export const getRecommendationTrips = (accessToken: string) => {
//   // const { accessToken } = authStore()
//   return axiosInstance.get('/api/travels/recommend', {
//     headers: getJWTHeader(accessToken)
//   })
// }
