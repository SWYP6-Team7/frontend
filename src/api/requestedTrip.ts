import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
// 참가 신청 대기 목록 조회.
export const getRequestedTrips = async (
  pageParam: number,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.get('/api/my-requested-travels', {
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
// 대기 목록 조회에서 취소
export const deleteRequestedTrips = (
  accessToken: string,
  travelNumber: number
) => {
  return axiosInstance.delete(
    `/api/my-requested-travels/${travelNumber}/cancel`,
    {
      headers: getJWTHeader(accessToken)
    }
  )
}
