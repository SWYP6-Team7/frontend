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

export const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
  if (response.data.resultType !== "SUCCESS") {
    throw new Error("API call failed: Unexpected resultType");
  }

  if (response.data?.error !== null || response.data?.error !== undefined) {
    throw new Error(response.data.error?.reason || "Unknown error occurred");
  }

  if (response.data.success === null) {
    throw new Error("API call succeeded but no data was returned");
  }

  return response.data.success;
};
