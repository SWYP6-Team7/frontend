"use client";
import { deleteBookmark, postBookmark } from "@/api/bookmark";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateBookmark(
  accessToken: string,
  userId: number,
  travelNumber: number
) {
  const queryClient = useQueryClient();
  const { mutateAsync: postBookmarkMutation } = useMutation({
    mutationFn: () => {
      return postBookmark(accessToken, userId, travelNumber);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
      console.log(queryClient.getQueryCache().findAll());
      queryClient
        .getQueryCache()
        .findAll()
        .forEach((query) => {
          if (query.queryKey[0] === "search") {
            queryClient.invalidateQueries({
              queryKey: query.queryKey,
            });
          }
        });
      queryClient.invalidateQueries({
        queryKey: ["myTrips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myApplyTrips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tripRecommendation"],
      });
      queryClient.invalidateQueries({
        queryKey: ["availableTrips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tripDetail", travelNumber],
      });
      queryClient.invalidateQueries({
        queryKey: ["myRequestedTrips"],
      });
    },
  });

  const {
    mutateAsync: deleteBookmarkMutation,
    isSuccess: isBookmarkDeleteSuccess,
  } = useMutation({
    mutationFn: () => {
      return deleteBookmark(accessToken, travelNumber);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks"],
      });
      console.log(queryClient.getQueryCache().findAll());
      queryClient
        .getQueryCache()
        .findAll()
        .forEach((query) => {
          if (query.queryKey[0] === "search") {
            queryClient.invalidateQueries({
              queryKey: query.queryKey,
            });
          }
        });
      queryClient.invalidateQueries({
        queryKey: ["myTrips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["myApplyTrips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tripRecommendation"],
      });
      queryClient.invalidateQueries({
        queryKey: ["availableTrips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tripDetail", travelNumber],
      });
      queryClient.invalidateQueries({
        queryKey: ["myRequestedTrips"],
      });
    },
  });

  return {
    postBookmarkMutation,
    deleteBookmarkMutation,
    isBookmarkDeleteSuccess,
  };
}
