import {
  deleteComment,
  getComments,
  likeComment,
  postComment,
  unlikeComment,
  updateComment
} from '@/api/comment'

import { ICommentPost } from '@/model/comment'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const useComment = (
  relatedType: 'travel' | 'community',
  relatedNumber: number
) => {
  const { userId, accessToken } = authStore()

  const commentList = useQuery({
    queryKey: ['comments', relatedType, relatedNumber],
    queryFn: () => getComments(relatedType, relatedNumber, accessToken),
    enabled: !!relatedNumber && !!accessToken
  })

  const queryClient = useQueryClient()

  const postMutation = useMutation({
    mutationFn: (data: ICommentPost) =>
      postComment(data, relatedType, relatedNumber, accessToken)
  })

  const post = (data: ICommentPost) => {
    return postMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ['comments', relatedType, relatedNumber]
          })
        }
      }
    })
  }

  const updateMutation = useMutation({
    mutationFn: (data: { content: string; commentNumber: number }) =>
      updateComment(data, data.commentNumber, accessToken)
  })

  const update = (data: { content: string; commentNumber: number }) => {
    return updateMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ['comments', relatedType, relatedNumber]
          })
        }
      }
    })
  }

  const removeMutation = useMutation({
    mutationFn: (data: { commentNumber: number }) =>
      deleteComment(data.commentNumber, accessToken)
  })

  const remove = (data: { commentNumber: number }) => {
    return removeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ['comments', relatedType, relatedNumber]
          })
        }
      }
    })
  }

  const likeMutation = useMutation({
    mutationFn: (data: { commentNumber: number }) =>
      likeComment(data.commentNumber, accessToken)
  })

  const like = (data: { commentNumber: number }) => {
    return likeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ['comments', relatedType, relatedNumber]
          })
        }
      }
    })
  }

  const unlikeMutation = useMutation({
    mutationFn: (data: { commentNumber: number }) =>
      unlikeComment(data.commentNumber, accessToken)
  })

  const unlike = (data: { commentNumber: number }) => {
    return unlikeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ['comments', relatedType, relatedNumber]
          })
        }
      }
    })
  }

  return {
    post,
    postMutation,
    update,
    updateMutation,
    remove,
    removeMutation,
    like,
    likeComment,
    unlike,
    unlikeMutation,
    commentList
  }
}

export default useComment
