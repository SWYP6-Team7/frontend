import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export const getBookmark = async (pageParams: number, accessToken: string) => {
  const response = await axiosInstance.get('/api/bookmarks', {
    params: {
      page: pageParams
    },
    headers: getJWTHeader(accessToken)
  })
  return response.data
}

export const postBookmark = (accessToken: string, travelNumber: number) => {
  return axiosInstance.post(
    '/api/bookmarks',
    {
      travelNumber
    },
    {
      headers: getJWTHeader(accessToken)
    }
  )
}

export const deleteBookmark = (accessToken: string, travelNumber: number) => {
  return axiosInstance.delete(
    '/api/bookmarks',

    {
      params: {
        travelNumber
      },
      headers: getJWTHeader(accessToken)
    }
  )
}
