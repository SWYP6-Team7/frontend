import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import RequestError from "@/context/ReqeustError";
// 참가 신청 대기 목록 조회.
export const getRequestedTrips = async (pageParam: number, accessToken: string) => {
  try {
    const response = await axiosInstance.get("/api/my-requested-travels", {
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
// 대기 목록 조회에서 취소
export const deleteRequestedTrips = async (accessToken: string, travelNumber: number) => {
  try {
    const response = await axiosInstance.delete(`/api/my-requested-travels/${travelNumber}/cancel`, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
