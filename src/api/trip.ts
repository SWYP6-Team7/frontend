import RequestError from "@/context/ReqeustError";
import { axiosInstance, handleApiResponse } from ".";
import { getJWTHeader } from "@/utils/user";
import { CreateTripReqData } from "@/hooks/createTrip/useCreateTrip";
import axios from "axios";
// 여행 관련 필요한 API요청들.

export const createTrip = async (
  travelData: CreateTripReqData,
  accessToken: string
) => {
  try {
    const response = await axiosInstance.post("/api/travel", travelData, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};

export const getPlans = async (
  travelNumber: number,
  pageParams: number | null
) => {
  try {
    const result = await axios.get(`/gettest`, {
      params: {
        cursor: pageParams,
        size: 5,
      },
    });
    return handleApiResponse(result);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
