"use client";
import { getUserProfile, getUserAppliedTravels, getUserCreatedTravels } from "@/api/userProfile";
import { IUserProfileInfo, IUserRelatedTravelList } from "@/model/userProfile";
import { authStore } from "@/store/client/authStore";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import { useQuery, useInfiniteQuery, InfiniteData } from "@tanstack/react-query";

const useUserProfile = () => {
  const { accessToken } = authStore();
  const { userProfileUserId } = userProfileOverlayStore();

  const { data: userProfileInfo, isLoading: isLoadingUserProfileInfo } = useQuery<IUserProfileInfo | null>({
    queryKey: ["userProfile", userProfileUserId],
    queryFn: () => getUserProfile(accessToken!, userProfileUserId!),
    enabled: !!accessToken && userProfileUserId !== -1,
    retry: !!accessToken,
    staleTime: 0,
  });

  const {
    data: userProfileCreatedTravelsData,
    isLoading: isUserProfileCreatedTravelsLoading,
    error: userProfileCreatedTravelsError,
    fetchNextPage: fetchNextUserProfileCreatedTravelsPage,
    refetch: refetchUserProfileCreatedTravels,
    isFetching: isUserProfileCreatedTravelsFetching,
    hasNextPage: hasNextUserProfileCreatedTravelsPage,
  } = useInfiniteQuery<IUserRelatedTravelList, Error, InfiniteData<IUserRelatedTravelList>, [string, number]>({
    queryKey: ["userProfileCreatedTravels", userProfileUserId],
    queryFn: ({ pageParam }) => {
      return getUserCreatedTravels(pageParam as number, accessToken!, userProfileUserId) as any;
    },
    enabled: !!accessToken && userProfileUserId !== -1,
    retry: Boolean(accessToken),
    staleTime: 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages || lastPage.page?.totalPages === 0) {
        return undefined;
      } else {
        if (lastPage?.page?.number + 1 === 3) return undefined; //30개까지만 요청
        return lastPage?.page?.number + 1;
      }
    },
  });

  const {
    data: userProfileAppliedTravelsData,
    isLoading: isUserProfileAppliedTravelsLoading,
    error: userProfileAppliedTravelsError,
    fetchNextPage: fetchNextUserProfileAppliedTravelsPage,
    refetch: refetchUserProfileAppliedTravels,
    isFetching: isUserProfileAppliedTravelsFetching,
    hasNextPage: hasNextUserProfileAppliedTravelsPage,
  } = useInfiniteQuery<IUserRelatedTravelList, Error, InfiniteData<IUserRelatedTravelList>, [string, number]>({
    queryKey: ["userProfileAppliedTravels", userProfileUserId],
    queryFn: ({ pageParam }) => {
      return getUserAppliedTravels(pageParam as number, accessToken!, userProfileUserId) as any;
    },
    enabled: !!accessToken && userProfileUserId !== -1,
    retry: Boolean(accessToken),
    staleTime: 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage?.page?.number + 1 === lastPage?.page?.totalPages || lastPage.page?.totalPages === 0) {
        return undefined;
      } else {
        if (lastPage?.page?.number + 1 === 3) return undefined; // 30개까지만 요청
        return lastPage?.page?.number + 1;
      }
    },
  });
  return {
    userProfileInfo,
    isLoadingUserProfileInfo,

    userProfileCreatedTravelsData,
    isUserProfileCreatedTravelsLoading,
    userProfileCreatedTravelsError,
    fetchNextUserProfileCreatedTravelsPage,
    refetchUserProfileCreatedTravels,
    isUserProfileCreatedTravelsFetching,
    hasNextUserProfileCreatedTravelsPage,

    userProfileAppliedTravelsData,
    isUserProfileAppliedTravelsLoading,
    userProfileAppliedTravelsError,
    fetchNextUserProfileAppliedTravelsPage,
    refetchUserProfileAppliedTravels,
    isUserProfileAppliedTravelsFetching,
    hasNextUserProfileAppliedTravelsPage,
  };
};
export default useUserProfile;
