"use client";
import { createTrip } from "@/api/trip";
import { CreateTripReqData } from "@/model/trip";

import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useCreateTrip = (travelData: CreateTripReqData, accessToken: string) => {
  const queryClient = useQueryClient();
  const { mutate: createTripMutate, isSuccess: isCreatedSuccess } = useMutation({
    mutationFn: () => {
      return createTrip(travelData, accessToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["createTrip"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tripRecommendation"],
      });
      queryClient.invalidateQueries({
        queryKey: ["availableTrips"],
      });
    },
  });
  return { createTripMutate, isCreatedSuccess };
};
