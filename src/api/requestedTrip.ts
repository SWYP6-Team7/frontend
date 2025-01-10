import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import RequestError from '@/context/ReqeustError'
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
  } catch (err: any) {
    throw new RequestError(err)
  }
}
// 대기 목록 조회에서 취소
export const deleteRequestedTrips = (
  accessToken: string,
  travelNumber: number
) => {
  try {
    return axiosInstance.delete(
      `/api/my-requested-travels/${travelNumber}/cancel`,
      {
        headers: getJWTHeader(accessToken)
      }
    )
  } catch (err: any) {
    throw new RequestError(err)
  }
}
