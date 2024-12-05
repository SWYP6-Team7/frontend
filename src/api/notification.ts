import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import RequestError from '@/context/ReqeustError'

export async function getNotifications(
  pageParams: number,
  accessToken: string
) {
  try {
    const response = await axiosInstance.get(`/api/notifications`, {
      params: {
        page: pageParams
      },
      headers: getJWTHeader(accessToken)
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    throw new RequestError(error)
  }
}
