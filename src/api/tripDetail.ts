import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { ITripDetail } from '@/model/tripDetail'
import RequestError from '@/context/ReqeustError'

export async function getTripDetail(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    return axiosInstance.get(`/api/travel/detail/${travelNumber}`, {
      ...(accessToken && { headers: getJWTHeader(accessToken) })
    })
  } catch (err: any) {
    throw new RequestError(err)
  }
}

// 현재 신청한 사람 수 조회
export async function getTripEnrollmentCount(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.get(`/api/travel/${travelNumber}/enrollmentCount`, {
      headers: getJWTHeader(accessToken)
    })
  } catch (err: any) {
    throw new RequestError(err)
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
  } catch (err: any) {
    throw new RequestError(err)
  }
}
export async function updateTripDetail(
  travelNumber: number,
  data: ITripDetail,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    const newData = { ...data, locationName: data.location }
    return axiosInstance.put(`/api/travel/${travelNumber}`, newData, {
      headers: getJWTHeader(accessToken)
    })
    return true
  } catch (err: any) {
    throw new RequestError(err)
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
  } catch (err: any) {
    throw new RequestError(err)
  }
}
