"use client";
import { createTrip } from "@/api/trip";
import { SpotType } from "@/store/client/createTripStore";

import { useQueryClient, useMutation } from "@tanstack/react-query";

interface Plan {
  planOrder: number;
  spots: SpotType[];
}

export interface CreateTripReqData {
  locationName: string;
  startDate: string;
  endDate: string;
  title: string;
  details: string;
  maxPerson: number;
  genderType: string;
  periodType: string;
  tags: string[];
  plans: Plan[];
}
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
