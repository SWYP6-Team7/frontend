import { getJWTHeader } from '@/utils/user'
import { axiosInstance } from '.'
import { authStore } from '@/store/client/authStore'
import { ITripList } from '@/model/trip'
import { daysAgo } from '@/utils/time'
import dayjs from 'dayjs'
import RequestError from '@/context/ReqeustError'

export const getBookmark = async (
  pageParams: number,
  accessToken: string | null
) => {
  try {
    const response = await axiosInstance.get('/api/bookmarks', {
      params: {
        page: pageParams,
        size: 10
      },
      ...(accessToken && { headers: getJWTHeader(accessToken) })
    })
    let data = response.data as ITripList | undefined
    if (response.data) {
      data = {
        ...response.data,
        content: (response.data as ITripList).content.filter(
          item =>
            dayjs(item.registerDue, 'YYYY-MM-DD').diff(
              dayjs().startOf('day'),
              'day'
            ) >= 0
        )
      }
    } else {
      return response.data
    }

    return data
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export const postBookmark = (
  accessToken: string,
  userId: number,
  travelNumber: number
) => {
  try {
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
  } catch (err: any) {
    throw new RequestError(err)
  }
}

export const deleteBookmark = (accessToken: string, travelNumber: number) => {
  try {
    return axiosInstance.delete(`/api/bookmarks/${travelNumber}`, {
      headers: getJWTHeader(accessToken)
    })
  } catch (err: any) {
    throw new RequestError(err)
  }
}
