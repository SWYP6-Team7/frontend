import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'

export const getBookmark = (accessToken: string) => {
  return axiosInstance.get('/api/bookmarks', {
    headers: getJWTHeader(accessToken)
  })
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
