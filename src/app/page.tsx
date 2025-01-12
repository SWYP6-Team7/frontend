import Home from '@/pages/Home/Home'
import Test from './Test'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { getAvailableTrips, getRecommendationTrips } from '@/api/home'

export default async function HomePage() {
  const queryClient = new QueryClient()

  // 첫 페이지만 프리패치
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['availableTrips'],
    queryFn: ({ pageParam = 0 }) => {
      return getAvailableTrips(pageParam, null)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: {
      page: { number: number; totalPages: any }
    }) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined
      } else {
        return lastPage?.page?.number + 1
      }
    }
  })
  const data = queryClient.getQueryData(['availableTrips'])
  console.log(data, 'data')
  const dehydratedstate = dehydrate(queryClient)
  return <Home />
}
