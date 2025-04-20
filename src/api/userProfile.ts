import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import RequestError from "@/context/ReqeustError";
import { IUserProfileInfo } from "@/model/userProfile";

export const getUserProfile = async (accessToken: string, userNumber: number): Promise<IUserProfileInfo | null> => {
  try {
    const response = await axiosInstance.get(`/api/users/${userNumber}/profile`, {
      headers: getJWTHeader(accessToken),
    });

    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
// 상대방의 만든 여행 조회
export const getUserCreatedTravels = async (pageParam: number, accessToken: string, userNumber: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userNumber}/created-travel`, {
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
// 상대방의 참가 여행 조회.

export const getUserAppliedTravels = async (pageParam: number, accessToken: string, userNumber: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userNumber}/applied-travel`, {
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
