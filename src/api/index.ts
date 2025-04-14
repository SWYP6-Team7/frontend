import { getJWTHeader } from "@/utils/user";
import axios, { AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;

interface ApiResponse<T> {
  resultType: string;
  error?: {
    errorType?: string;
    reason?: string;
    title?: string;
  } | null;
  success: T | null;
}

let retryCount = 0;
const MAX_RETRY_COUNT = 50;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("error console", error);

    if (error.response?.status === 401 || error.response?.status === 403) {
      retryCount += 1;

      // 재시도 횟수가 최대치를 초과하면 에러를 던지기
      if (retryCount > MAX_RETRY_COUNT) {
        console.error("Max retry attempts reached. Throwing error.");
        throw new Error("Authentication failed after multiple attempts.");
      }

      try {
        // 토큰 갱신 요청
        const refreshResponse = await axiosInstance.post("/api/token/refresh", {});
        const newAccessToken = refreshResponse.data.success.accessToken;

        console.log("new AccessToken", newAccessToken, refreshResponse);

        // 갱신된 토큰으로 원래 요청 재시도
        return axiosInstance({
          ...originalRequest,
          headers: getJWTHeader(newAccessToken),
        });
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T | null>>): T | null => {
  console.log("response", response);

  if (response.data.resultType !== "SUCCESS") {
    throw new Error("API call failed: Unexpected resultType");
  }

  if (response.data?.error != null) {
    throw new Error(response.data.error?.reason || "Unknown error occurred");
  }

  return response.data.success;
};
