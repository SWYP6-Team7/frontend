import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { authStore } from '@/store/client/authStore'
import { ITripList } from '@/model/trip'
import { daysAgo } from '@/utils/time'

export const getBookmark = async (pageParams: number, accessToken: string) => {
  const response = await axiosInstance.get('/api/bookmarks', {
    params: {
      page: pageParams,
      size: 10
    },
    headers: getJWTHeader(accessToken)
  })
  let data = response.data as ITripList | undefined
  if (response.data) {
    data = {
      ...response.data,
      content: (response.data as ITripList).content.filter(
        item => Number(daysAgo(item.registerDue)) < 0
      )
    }
  } else {
    return response.data
  }

  return data
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
