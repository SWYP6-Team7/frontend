import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { ITripDetail } from '@/model/tripDetail'
// 수정 필요.
export async function getTripDetail(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    console.log(travelNumber, '요청감')
    // if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.get(`/api/travel/detail/${travelNumber}`, {
      headers: getJWTHeader('')
    })
  } catch (err) {
    console.log(err)
  }
}

export async function updateTripDetail(
  travelNumber: number,
  data: ITripDetail,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.put(`/api/travel/${travelNumber}`, data, {
      headers: getJWTHeader(accessToken)
    })
    return true
  } catch (err) {
    console.log(err)
  }
}

export async function deleteTripDetail(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.delete(`/api/travel/${travelNumber}`, {
      headers: getJWTHeader(accessToken)
    })
  } catch (err) {
    console.log(err)
  }
}
