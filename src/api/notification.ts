import { axiosInstance } from '.'

export async function getNotifications(pageParams: number, userNumber: number) {
  const response = await axiosInstance.get(`/api/notifications/${userNumber}`, {
    params: {
      page: pageParams
    }
  })
  console.log(response.data)
  return response.data
}
