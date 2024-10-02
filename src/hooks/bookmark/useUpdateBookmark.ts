import { deleteBookmark, postBookmark } from '@/api/bookmark'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateBookmark(accessToken: string, travelNumber: number) {
  const queryClient = useQueryClient()
  const { mutateAsync: postBookmarkMutation } = useMutation({
    mutationFn: () => {
      return postBookmark(accessToken, travelNumber)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmarks']
      })
    }
  })

  const { mutateAsync: deleteBookmarkMutation } = useMutation({
    mutationFn: () => {
      return deleteBookmark(accessToken, travelNumber)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookmarks']
      })
    }
  })
  return { postBookmarkMutation, deleteBookmarkMutation }
}
