"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { checkNetworkConnection } from "./user/useAuth";
import { axiosInstance, handleApiResponse } from "@/api";
import RequestError from "@/context/ReqeustError";
import { errorStore } from "@/store/client/errorStore";

const useVerifyEmail = () => {
  const { updateError, setIsMutationError } = errorStore();
  const verifyEmailSend = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (!checkNetworkConnection()) return;

      const response = await axiosInstance.post("/api/verify/email/send", {
        email,
      });
      if (!response.data?.success) {
        throw new Error(response.data?.error.reason);
      }
      return response?.data;
    },
    onSuccess: (data: any) => {
      console.log(data, "data");
      if (data.success) {
        sessionStorage.setItem("sessionToken", data.success.sessionToken);
      } else {
        updateError(data.error.reason);
        setIsMutationError(true);
      }
    },
    onError: (error: any) => {
      console.error(error);
      throw new RequestError(error);
    },
  });

  const verifyEmail = useMutation({
    mutationFn: async ({ verifyCode }: { verifyCode: string }) => {
      if (!checkNetworkConnection()) return;
      const sessionToken = sessionStorage.getItem("sessionToken") ?? "";

      const response = await axiosInstance.post("/api/verify/email", {
        verifyCode,
        sessionToken,
      });
      if (!response.data?.success) {
        throw new RequestError(response.data?.error.reason);
      }
      return response?.data;
    },
    mutationKey: ["verifyEmailCode"],
    onSuccess: (data: any) => {
      console.log(data, "data");
      if (data.success) {
      } else {
        console.error(data.error.reason);
        updateError(data.error.reason);
        setIsMutationError(true);
      }
    },
    onError: (error: any) => {
      console.error(error);
      // throw new RequestError(error);
    },
  });

  return {
    verifyEmailSend,
    verifyEmail,
  };
};

export default useVerifyEmail;
