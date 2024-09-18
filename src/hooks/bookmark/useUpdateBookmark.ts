import { toggleBookmark } from '@/api/home'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateBookmark(userId: string, postId: string) {
  const queryClient = useQueryClient()
  const { mutateAsync: updateBookmark } = useMutation({
    mutationFn: () => {
      return toggleBookmark(userId, postId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['availableTrips']
      })
      queryClient.invalidateQueries({
        queryKey: ['tripRecommendation']
      })
      // 참가 가능 리스트, 추천 리스트에서 즐겨찾기 여부 업데이트시 필요.
      //   queryClient.invalidateQueries({
      //     queryKey: ['blahblah']
      //   })
    }
  })
  return { updateBookmark }
}
