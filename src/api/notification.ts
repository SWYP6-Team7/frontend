import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export async function getNotifications(
  pageParams: number,
  userNumber: number,
  accessToken: string
) {
  const response = await axiosInstance.get(`/api/notifications/${userNumber}`, {
    params: {
      page: pageParams
    },
    headers: getJWTHeader(accessToken)
  })
  console.log(response.data)
  return response.data
}
