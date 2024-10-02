import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
// 만든 여행 조회.
export const getMyTrips = (accessToken: string) => {
  return axiosInstance.get('/api/my-travels', {
    headers: getJWTHeader(accessToken)
  })
}
// 참가 여행 조회.

export const getApplyTrips = (accessToken: string) => {
  return axiosInstance.get('/api/my-applied-travels', {
    headers: getJWTHeader(accessToken)
  })
}

// 내 여행 목록에서 참가한 여행 취소 api
export const deleteMyApplyTrips = (
  accessToken: string,
  travelNumber: number
) => {
  return axiosInstance.delete(
    `/api/my-applied-travels/${travelNumber}/cancel`,
    {
      headers: getJWTHeader(accessToken)
    }
  )
}
