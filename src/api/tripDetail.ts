import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { ITripDetail } from '@/model/tripDetail'

export async function getTripDetail(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    //if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.get(`/api/travel/detail/${travelNumber}`, {
      headers: getJWTHeader(accessToken)
    })
  } catch (err) {
    console.log(err)
  }
}

// 모집한 인원 목록 조회
export async function getCompanions(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.get(`/api/travel/${travelNumber}/companions`, {
      headers: getJWTHeader(accessToken)
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
