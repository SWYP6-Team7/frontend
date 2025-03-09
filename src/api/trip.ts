import RequestError from "@/context/ReqeustError";
import { axiosInstance, handleApiResponse } from ".";
import { getJWTHeader } from "@/utils/user";
import { CreateTripReqData } from "@/hooks/createTrip/useCreateTrip";
// 여행 관련 필요한 API요청들.

export const createTrip = async (travelData: CreateTripReqData, accessToken: string) => {
  try {
    const response = await axiosInstance.post("/api/travel", travelData, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
