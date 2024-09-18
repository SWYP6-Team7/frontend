import { axiosInstance } from '.'
// 홈페이지에서 필요한 API요청들.
export const getBookmark = (userId: string) => {
  console.log(userId, '유저 아이디')
  return axiosInstance.get(`/api/bookmark?userId=${userId}`)
}

export const toggleBookmark = (userId: string, postId: string) => {
  return axiosInstance.post(
    `/api/toggleBookmark?userId=${userId}&postId=${postId}`
  )
}

export const getAvailableTrips = () => {
  return axiosInstance.get('/api/availableTrip')
}

export const getRecommendationTrips = () => {
  return axiosInstance.get('/api/tripRecommendation')
}
