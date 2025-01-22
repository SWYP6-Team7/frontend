"use client";
import {
  deleteCommunity,
  getCommunities,
  getCommunity,
  getImages,
  getMyCommunities,
  likeCommunity,
  postCommunity,
  postImage,
  unlikeCommunity,
  updateCommunity,
  updateImage,
} from "@/api/community";
import { ICommunityList, PostCommunity } from "@/model/community";
import { authStore } from "@/store/client/authStore";
import { EditFinalImages, EditImage, FinalImages, UploadImage } from "@/store/client/imageStore";
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAuth from "./user/useAuth";

export interface IListParams {
  sortingTypeName?: string;
  categoryName?: string;
  keyword?: string;
}

const useCommunity = (
  communityNumber: number | undefined = undefined,
  params: IListParams = {
    sortingTypeName: "최신순",
    keyword: "",
    categoryName: "",
  },
  isMine = false
) => {
  const { sortingTypeName = "최신순", keyword = "", categoryName = "전체" } = params;
  const {
    refreshTokenMutation: { isError: isRefreshTokenError, isSuccess: isRefreshTokenSuccess },
  } = useAuth();
  const { accessToken } = authStore();
  const communityList = useInfiniteQuery<
    ICommunityList,
    Object,
    InfiniteData<ICommunityList>,
    [_1: string, _2: { categoryName: string; sortingTypeName: string; keyword: string }, _3: boolean]
  >({
    queryKey: ["community", { categoryName: categoryName, sortingTypeName, keyword }, isMine],
    enabled: isRefreshTokenError || isRefreshTokenSuccess,
    queryFn: ({ pageParam }) => {
      if (isMine) {
        return getMyCommunities(accessToken, {
          ...params,
          page: pageParam as number,
        });
      }
      return getCommunities(accessToken, {
        ...params,
        page: pageParam as number,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages) {
        return undefined;
      } else {
        return lastPage?.page?.number + 1;
      }
    },
  });
  const community = useQuery({
    queryKey: ["community", communityNumber],
    queryFn: () => getCommunity(communityNumber!, accessToken),
    enabled: !!communityNumber && (isRefreshTokenError || isRefreshTokenSuccess),
  });

  const images = useQuery({
    queryKey: ["community", "images", communityNumber],
    queryFn: () => getImages(communityNumber!, accessToken),
    enabled: !!communityNumber,
  });

  const postImageMutation = useMutation({
    mutationFn: (data: { uploadImages: FinalImages; communityNumber: number }) =>
      postImage(data.uploadImages, data.communityNumber, accessToken),
    onSuccess: () => {
      if (images.data) {
        queryClient.invalidateQueries({
          queryKey: ["community", "images", communityNumber],
        });
      }
    },
  });

  const updateImageMutation = useMutation({
    mutationFn: (data: { editImages: EditFinalImages; communityNumber: number }) =>
      updateImage(data.editImages, data.communityNumber, accessToken),
    onSuccess: () => {
      if (images.data) {
        queryClient.invalidateQueries({
          queryKey: ["community", "images", communityNumber],
        });
      }
    },
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (data: PostCommunity) => postCommunity(data, accessToken),
  });

  const post = (data: PostCommunity) => {
    return postMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ["community"],
          });
        }
      },
    });
  };

  const updateMutation = useMutation({
    mutationFn: (data: PostCommunity & { communityNumber: number }) =>
      updateCommunity(data, data.communityNumber, accessToken),
  });

  const update = (data: PostCommunity & { communityNumber: number }) => {
    return updateMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ["community"],
          });
        }
      },
    });
  };

  const removeMutation = useMutation({
    mutationFn: (data: { communityNumber: number }) => deleteCommunity(data.communityNumber, accessToken),
  });

  const remove = (data: { communityNumber: number }) => {
    return removeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ["community"],
          });
        }
      },
    });
  };

  const likeMutation = useMutation({
    mutationFn: (data: { communityNumber: number }) => likeCommunity(data.communityNumber, accessToken),
  });

  const like = (data: { communityNumber: number }) => {
    return likeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ["community", data.communityNumber],
          });
        }
      },
    });
  };

  const unlikeMutation = useMutation({
    mutationFn: (data: { communityNumber: number }) => unlikeCommunity(data.communityNumber, accessToken),
  });

  const unlike = (data: { communityNumber: number }) => {
    return unlikeMutation.mutateAsync(data, {
      onSuccess: () => {
        if (communityList.data) {
          queryClient.invalidateQueries({
            queryKey: ["community", data.communityNumber],
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
    likeMutation,
    unlike,
    unlikeMutation,
    communityList,
    community,
    images,
    postImageMutation,
    updateImageMutation,
  };
};

export default useCommunity;
