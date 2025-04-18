import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import RequestError from "@/context/ReqeustError";
// 만든 여행 조회.
export const getMyTrips = async (pageParam: number, accessToken: string) => {
  try {
    const response = await axiosInstance.get("/api/my-travels", {
      headers: getJWTHeader(accessToken),
      params: {
        page: pageParam,
        size: 10,
      },
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
// 참가 여행 조회.

export const getApplyTrips = async (pageParam: number, accessToken: string) => {
  try {
    const response = await axiosInstance.get("/api/my-applied-travels", {
      headers: getJWTHeader(accessToken),
      params: {
        page: pageParam,
        size: 10,
      },
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};

// 내 여행 목록에서 참가한 여행 취소 api
export const deleteMyApplyTrips = async (accessToken: string, travelNumber: number) => {
  try {
    const response = await axiosInstance.delete(`/api/my-applied-travels/${travelNumber}/cancel`, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
