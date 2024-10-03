import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { authStore } from '@/store/client/authStore'

export const getBookmark = async (pageParams: number, accessToken: string) => {
  const response = await axiosInstance.get('/api/bookmarks', {
    params: {
      page: pageParams,
      size: 10
    },
    headers: getJWTHeader(accessToken)
  })
  return response.data
}

export const postBookmark = (
  accessToken: string,
  userId: number,
  travelNumber: number
) => {
  return axiosInstance.post(
    '/api/bookmarks',
    {
      userNumber: userId,
      travelNumber
    },
    {
      headers: getJWTHeader(accessToken)
    }
  )
}

export const deleteBookmark = (accessToken: string, travelNumber: number) => {
  return axiosInstance.delete(`/api/bookmarks/${travelNumber}`, {
    headers: getJWTHeader(accessToken)
  })
}
