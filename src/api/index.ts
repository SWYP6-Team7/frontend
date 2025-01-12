import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL,
  timeout: 5000,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.withCredentials = true;
