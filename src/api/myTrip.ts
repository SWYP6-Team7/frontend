import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
// 만든 여행 조회.
export const getMyTrips = async (pageParam: number, accessToken: string) => {
  try {
    const response = await axiosInstance.get('/api/my-travels', {
      headers: getJWTHeader(accessToken),
      params: {
        page: pageParam,
        size: 10
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
}
// 참가 여행 조회.

export const getApplyTrips = async (pageParam: number, accessToken: string) => {
  try {
    const response = await axiosInstance.get('/api/my-applied-travels', {
      headers: getJWTHeader(accessToken),
      params: {
        page: pageParam,
        size: 10
      }
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
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
