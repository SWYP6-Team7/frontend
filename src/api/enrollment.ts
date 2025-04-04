import { getJWTHeader } from "@/utils/user";
import { axiosInstance, handleApiResponse } from ".";
import { IPostEnrollment } from "@/model/enrollment";
import { ERROR_MESSAGES } from "@/constants/errorMessages";
import RequestError from "@/context/ReqeustError";
// 신청자 - 참가 신청
export async function postEnrollment(data: IPostEnrollment, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.post("/api/enrollment", data, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
// 신청자 - 참가신청 취소
export async function cancelEnrollment(enrollmentNumber: number, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.delete(`/api/enrollment/${enrollmentNumber}`, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
// 주최자 - 참가 신청 목록 조회.
export async function getEnrollments(travelNumber: number, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.get(`/api/travel/${travelNumber}/enrollments`, {
      headers: getJWTHeader(accessToken),
    });
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
// 최근 열람 조회
export async function getLastViewed(travelNumber: number, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.get(`/api/travel/${travelNumber}/enrollments/last-viewed`, {
      headers: getJWTHeader(accessToken),
    });

    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
// 최근 신청 열람 시점 업데이트
export async function putLastViewed(travelNumber: number, accessToken: string | null, viewedAt: string) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.put(
      `/api/travel/${travelNumber}/enrollments/last-viewed`,
      {
        lastViewedAt: viewedAt,
      },
      {
        headers: getJWTHeader(accessToken),
      }
    );
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}

// 참가 신청 거절
export async function rejectEnrollment(enrollmentNumber: number, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.put(
      `/api/enrollment/${enrollmentNumber}/rejection`,
      {},
      {
        headers: getJWTHeader(accessToken),
      }
    );
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
// 참가 신청 수락.
export async function acceptEnrollment(enrollmentNumber: number, accessToken: string | null) {
  try {
    if (!accessToken) throw new Error(ERROR_MESSAGES.needLogin);
    const response = await axiosInstance.put(
      `/api/enrollment/${enrollmentNumber}/acceptance`,
      {},
      {
        headers: getJWTHeader(accessToken),
      }
    );
    return handleApiResponse(response);
  } catch (err: any) {
    throw new RequestError(err);
  }
}
