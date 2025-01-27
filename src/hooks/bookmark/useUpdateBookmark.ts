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
      }),
        await queryClient.refetchQueries({
          queryKey: ["search"],
          exact: false,
          refetchType: "all",
        });

      queryClient.invalidateQueries({
        queryKey: ["myTrips"],
      }),
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
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["bookmarks"],
        });
      }, 1500);

      await queryClient.refetchQueries({
        queryKey: ["search"],
        exact: false,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["myTrips"],
      }),
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
