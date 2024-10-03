import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export const getMyPage = (accessToken: string) => {
  return axiosInstance.get('/api/profile/me', {
    headers: getJWTHeader(accessToken)
  })
}
// 배포 후에 더 추가하기.
export const putMyPage = (accessToken: string, name: string) => {
  return axiosInstance.put(
    '/api/profile/update',
    {
      name
    },
    {
      headers: getJWTHeader(accessToken)
    }
  )
}
