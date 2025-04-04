import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import { ITripList } from "@/model/trip";
import { daysAgo } from "@/utils/time";
import dayjs from "dayjs";
import RequestError from "@/context/ReqeustError";

export const getUserProfile = async (accessToken: string) => {
  const response = await axiosInstance.get(`/api/profile/me?userNumber=${accessToken}`);
  return handleApiResponse(response);
};

export const getAvailableTrips = async (pageParams: number, accessToken: string | null) => {
  try {
    const response = await axiosInstance.get("/api/travels/recent", {
      params: {
        page: pageParams,
        size: 10,
      },
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });

    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};

//api/home.ts
// 홈화면 참가가능 여행 api 백엔드 연결 예정 주석 처리.
// export const getAvailableTrips = (accessToken: string) => {
//   // const { accessToken } = authStore()
//   return axiosInstance.get('/api/travels/recent', {
//     headers: getJWTHeader(accessToken)
//   })
// }

export const getRecommendationTrips = async (pageParams: number, accessToken: string | null) => {
  try {
    const response = await axiosInstance.get("/api/travels/recommend", {
      params: {
        page: pageParams,
        size: 10,
      },
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });

    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
};

//api/home.ts
// 홈화면 추천 여행 api 백엔드 연결 예정 주석 처리.
// export const getRecommendationTrips = (accessToken: string) => {
//   // const { accessToken } = authStore()
//   return axiosInstance.get('/api/travels/recommend', {
//     headers: getJWTHeader(accessToken)
//   })
// }
