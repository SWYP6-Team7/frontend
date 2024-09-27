import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { IPostEnrollment } from '@/model/enrollment'

export async function postEnrollment(
  data: IPostEnrollment,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.post('/api/enrollment', data, {
      headers: getJWTHeader('')
    })
    return true
  } catch (err) {
    console.log(err)
  }
}

export async function cancelEnrollment(
  enrollmentNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.delete(`/api/enrollment/${enrollmentNumber}`, {
      headers: getJWTHeader(accessToken)
    })
  } catch (err) {
    console.log(err)
  }
}

export async function getEnrollments(
  travelNumber: number,
  accessToken: string | null
) {
  try {
    if (!accessToken) throw new Error('로그인을 해주세요.')
    return axiosInstance.get(`/api/travel/${travelNumber}/enrollments`, {
      headers: getJWTHeader(accessToken)
    })
  } catch (err) {
    console.log(err)
  }
}
