import { axiosInstance } from '@/api'
import { getAvailableTrips } from '@/api/home'
import { authStore } from '@/store/client/authStore'
import {
  useQuery,
  useQueryClient,
  useMutation,
  useInfiniteQuery,
  InfiniteData
} from '@tanstack/react-query'
import axios from 'axios'

export const useTripAvailable = () => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  } = useInfiniteQuery<
    ITripAvailable,
    Object,
    InfiniteData<ITripAvailable>,
    [_1: string]
  >({
    queryKey: ['availableTrips'],
    queryFn: ({ pageParam }) => getAvailableTrips(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined
      } else {
        return lastPage?.page?.number + 1
      }
    }
  })
  console.log(data)
  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  }
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
