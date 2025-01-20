"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { checkNetworkConnection } from "./user/useAuth";
import { axiosInstance } from "@/api";
import RequestError from "@/context/ReqeustError";

const useVerifyEmail = () => {
  const verifyEmailSend = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      if (!checkNetworkConnection()) return;

      const response = await axiosInstance.post("/api/verify/email/send", {
        email,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data, "data");
      if (data.success) {
        sessionStorage.setItem("sessionToken", data.success.sessionToken);
      } else {
        console.error(data.error.reason);
        throw new RequestError(data.error.reason);
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
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data, "data");
      if (data.success) {
      } else {
        console.error(data.error.reason);
        throw new RequestError(data.error.reason);
      }
    },
    onError: (error: any) => {
      console.error(error);
      throw new RequestError(error);
    },
  });

  return {
    verifyEmailSend,
    verifyEmail,
  };
};

export default useVerifyEmail;
