import {
  deleteCommunity,
  getCommunities,
  getCommunity,
  getImages,
  likeCommunity,
  postCommunity,
  unlikeCommunity,
  updateCommunity
} from '@/api/community'
import { PostCommunity } from '@/model/community'
import { authStore } from '@/store/client/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const useCommunity = (communityNumber: number | undefined = undefined) => {
  const { accessToken } = authStore()

  const communityList = useQuery({
    queryKey: ['community'],
    queryFn: () => getCommunities(accessToken!),
    enabled: !!accessToken
  })

  const community = useQuery({
    queryKey: ['community', communityNumber],
    queryFn: () => getCommunity(communityNumber!, accessToken!),
    enabled: !!accessToken && !!communityNumber
  })

  const images = useQuery({
    queryKey: ['community', 'images', communityNumber],
    queryFn: () => getImages(communityNumber!, accessToken!),
    enabled: !!accessToken && !!communityNumber
  })

  const queryClient = useQueryClient()

  const postMutation = useMutation({
    mutationFn: (data: PostCommunity) => postCommunity(data, accessToken)
  })

  const post = (data: PostCommunity) => {
    return postMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ['community']
          })
        }
      }
    })
  }

  const updateMutation = useMutation({
    mutationFn: (data: PostCommunity & { communityNumber: number }) =>
      updateCommunity(data, data.communityNumber, accessToken)
  })

  const update = (data: PostCommunity & { communityNumber: number }) => {
    return updateMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ['community']
          })
        }
      }
    })
  }

  const removeMutation = useMutation({
    mutationFn: (data: { communityNumber: number }) =>
      deleteCommunity(data.communityNumber, accessToken)
  })

  const remove = (data: { communityNumber: number }) => {
    return removeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ['community']
          })
        }
      }
    })
  }

  const likeMutation = useMutation({
    mutationFn: (data: { communityNumber: number }) =>
      likeCommunity(data.communityNumber, accessToken)
  })

  const like = (data: { communityNumber: number }) => {
    return likeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ['community', data.communityNumber]
          })
        }
      }
    })
  }

  const unlikeMutation = useMutation({
    mutationFn: (data: { communityNumber: number }) =>
      unlikeCommunity(data.communityNumber, accessToken)
  })

  const unlike = (data: { communityNumber: number }) => {
    return unlikeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ['community', data.communityNumber]
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
    likeMutation,
    unlike,
    unlikeMutation,
    communityList,
    community,
    images
  }
}

export default useCommunity
