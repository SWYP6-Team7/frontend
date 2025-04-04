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
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("error console", error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        const refreshResponse = await axiosInstance.post(
          "/api/token/refresh",
          {}
        );
        const newAccessToken = refreshResponse.data.success.accessToken;
        console.log("new AccessToken", newAccessToken, refreshResponse);

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

export const handleApiResponse = <T>(
  response: AxiosResponse<ApiResponse<T | null>>
): T | null => {
  console.log("response", response);

  if (response.data.resultType !== "SUCCESS") {
    throw new Error("API call failed: Unexpected resultType");
  }

  if (response.data?.error != null) {
    throw new Error(response.data.error?.reason || "Unknown error occurred");
  }

  // if (response.data.success === null) {
  //   throw new Error("API call succeeded but no data was returned");
  // }

  return response.data.success;
};
