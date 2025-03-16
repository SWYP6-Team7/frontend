import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import { ITripDetail } from "@/model/tripDetail";
import RequestError from "@/context/ReqeustError";
import { UpdateTripReqData } from "@/model/trip";

export async function getTripDetail(travelNumber: number, accessToken: string | null) {
  try {
    const response = await axiosInstance.get(`/api/travel/detail/${travelNumber}`, {
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}

// 현재 신청한 사람 수 조회
export async function getTripEnrollmentCount(travelNumber: number, accessToken: string | null) {
  try {
    const response = await axiosInstance.get(`/api/travel/${travelNumber}/enrollmentCount`, {
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
// 모집한 인원 목록 조회
export async function getCompanions(travelNumber: number, accessToken: string | null) {
  try {
    const response = await axiosInstance.get(`/api/travel/${travelNumber}/companions`, {
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
export async function updateTripDetail(travelNumber: number, data: UpdateTripReqData, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error("로그인을 해주세요.");
    const response = await axiosInstance.put(`/api/travel/${travelNumber}`, data, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}

export async function deleteTripDetail(travelNumber: number, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error("로그인을 해주세요.");
    const response = await axiosInstance.delete(`/api/travel/${travelNumber}`, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
