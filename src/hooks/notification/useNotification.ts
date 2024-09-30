import { getNotifications } from '@/api/notification'
import { INotification } from '@/model/notification'

import { ISearchData } from '@/model/search'
import { authStore } from '@/store/client/authStore'

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

const useNotification = () => {
  const userId = 1
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage
  } = useInfiniteQuery<
    INotification,
    Object,
    InfiniteData<INotification>,
    [_1: string]
  >({
    queryKey: ['notification'],
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      if (lastPage.page.number + 1 === lastPage.page.totalPages) {
        return undefined
      } else {
        return lastPage?.page.number + 1
      }
    },
    queryFn: ({ pageParam }) =>
      getNotifications(pageParam as number, userId as number),
    enabled: Boolean(userId)
  })

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

export default useNotification
