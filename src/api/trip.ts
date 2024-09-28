import { axiosInstance } from '.'
import { getJWTHeader } from '@/utils/user'
// 여행 관련 필요한 API요청들.
interface CreateTripReqData {
  location: string
  title: string
  details: string
  maxPerson: number
  genderType: string
  dueDate: string
  periodType: string
  tags: string[]
  completionStatus: boolean
}

export const createTrip = (
  travelData: CreateTripReqData,
  accessToken: string
) => {
  return axiosInstance.post('/api/travel', travelData, {
    headers: getJWTHeader(accessToken)
  })
}