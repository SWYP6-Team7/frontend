"use client";
import { deleteComment, getComments, likeComment, postComment, unlikeComment, updateComment } from "@/api/comment";

import { ICommentList, ICommentPost } from "@/model/comment";
import { authStore } from "@/store/client/authStore";
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../user/useAuth";

const useComment = (relatedType: "travel" | "community", relatedNumber: number) => {
  const { userId, accessToken, isGuestUser } = authStore();

  const commentList = useInfiniteQuery<
    ICommentList,
    Object,
    InfiniteData<ICommentList>,
    [_1: string, _2: string, _3: number]
  >({
    queryKey: ["comments", relatedType, relatedNumber],

    queryFn: ({ pageParam }) => {
      return getComments(relatedType, relatedNumber, accessToken, pageParam as number);
    },
    initialPageParam: 0,
    enabled: isGuestUser || !!accessToken,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.totalPages === 0) {
        return undefined;
      }
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined;
      } else {
        return lastPage?.page?.number + 1;
      }
    },
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (data: ICommentPost) => postComment(data, relatedType, relatedNumber, accessToken),
  });

  const post = (data: ICommentPost) => {
    return postMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ["comments", relatedType, relatedNumber],
          });
        }
      },
    });
  };

  const updateMutation = useMutation({
    mutationFn: (data: { content: string; commentNumber: number }) =>
      updateComment(data, data.commentNumber, accessToken),
  });

  const update = (data: { content: string; commentNumber: number }) => {
    return updateMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ["comments", relatedType, relatedNumber],
          });
        }
      },
    });
  };

  const removeMutation = useMutation({
    mutationFn: (data: { commentNumber: number }) => deleteComment(data.commentNumber, accessToken),
  });

  const remove = (data: { commentNumber: number }) => {
    return removeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ["comments", relatedType, relatedNumber],
          });
        }
      },
    });
  };

  const likeMutation = useMutation({
    mutationFn: (data: { commentNumber: number }) => likeComment(data.commentNumber, accessToken),
  });

  const like = (data: { commentNumber: number }) => {
    return likeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ["comments", relatedType, relatedNumber],
          });
        }
      },
    });
  };

  const unlikeMutation = useMutation({
    mutationFn: (data: { commentNumber: number }) => unlikeComment(data.commentNumber, accessToken),
  });

  const unlike = (data: { commentNumber: number }) => {
    return unlikeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (commentList.data) {
          queryClient.invalidateQueries({
            queryKey: ["comments", relatedType, relatedNumber],
          });
        }
      },
    });
  };

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
    commentList,
  };
};

export default useComment;
