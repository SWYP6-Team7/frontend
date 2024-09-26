import { axiosInstance } from '@/api'
import { getAvailableTrips } from '@/api/home'
import { authStore } from '@/store/client/authStore'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useTripAvailable = () => {
  const data = useQuery({
    queryKey: ['availableTrips'],
    queryFn: () => {
      return getAvailableTrips()
    }
  })
  console.log(data)
  return data
}

// 홈화면 참가가능 여행 api 백엔드 연결 예정 주석 처리.
// useTripAvailable.ts
// export const useTripAvailable = () => {
//   const { userId, accessToken } = authStore()
//   console.log(!!userId && !!accessToken, '유저 존재 확인!!')

//   const data = useQuery({
//     enabled: !!userId && !!accessToken, // userId와 accessToken이 존재할 때만 실행
//     queryKey: ['availableTrips'],
//     queryFn: () => {
//       return getAvailableTrips(accessToken!)
//     }
//   })
//   console.log(data)
//   return data
// }
