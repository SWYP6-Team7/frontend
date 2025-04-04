import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import { authStore } from "@/store/client/authStore";
import { ITripList } from "@/model/trip";
import { daysAgo } from "@/utils/time";
import dayjs from "dayjs";
import RequestError from "@/context/ReqeustError";

export const getBookmark = async (pageParams: number, accessToken: string | null) => {
  try {
    const result = await axiosInstance.get("/api/bookmarks", {
      params: {
        page: pageParams,
        size: 10,
      },
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    return handleApiResponse(result);
  } catch (err: any) {
    throw new RequestError(err);
  }
};

export const postBookmark = async (accessToken: string, userId: number, travelNumber: number) => {
  try {
    const response = await axiosInstance.post(
      "/api/bookmarks",
      {
        userNumber: userId,
        travelNumber,
      },
      {
        headers: getJWTHeader(accessToken),
      }
    );
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};

export const deleteBookmark = async (accessToken: string, travelNumber: number) => {
  try {
    const result = await axiosInstance.delete(`/api/bookmarks/${travelNumber}`, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(result);
  } catch (err: any) {
    throw new RequestError(err);
  }
};
