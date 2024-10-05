import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export async function getNotifications(
  pageParams: number,
  accessToken: string
) {
  const response = await axiosInstance.get(`/api/notifications`, {
    params: {
      page: pageParams
    },
    headers: getJWTHeader(accessToken)
  })
  console.log(response.data)
  return response.data
}
