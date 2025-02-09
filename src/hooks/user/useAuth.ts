"use client";
import { authStore } from "@/store/client/authStore";

import { axiosInstance } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import RequestError from "@/context/ReqeustError";
import { IRegisterEmail, IRegisterGoogle, IRegisterKakao } from "@/model/auth";
import { userStore } from "@/store/client/userStore";
import { getJWTHeader } from "@/utils/user";
import { usePathname, useRouter } from "next/navigation";
import { useBackPathStore } from "@/store/client/backPathStore";

// 로그인, 로그아웃, 이메일회원가입까지 구현
// 인증 부분을 처리하는 커스텀 훅

const noNeedPages = [
  "/login",
  "/registerEmail",
  "/registerName",
  "/registerAge",
  "/registerAge/registerGender",
  "/registerTripStyle",
  "/onBoarding",
  "/",
  "/trip/detail",
  "/myTrip",
];
const isAccessTokenNoNeedpages = (path: string) => {
  // 필요없는 페이지 인지 확인하는 함수.
  return noNeedPages.some((url) => path.startsWith(url));
};

export function checkNetworkConnection() {
  if (!navigator.onLine) {
    console.log("offline network");
    return false;
  }
  return true;
}
const useAuth = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setLoginData, clearLoginData, accessToken, resetData, setIsGuestUser } = authStore();
  const { setSocialLogin } = userStore();
  const { setLogin, login } = useBackPathStore();
  const loginEmailMutation = useMutation({
    mutationKey: ["emailLogin"],
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      if (!checkNetworkConnection()) return;

      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setLoginData({
        userId: Number(data.userId),
        accessToken: data.accessToken,
      });
      router.push(login);
    },
    onError: (error: any) => {
      console.error(error);
      throw new RequestError(error);
    },
  });

  const socialLoginMutation = useMutation({
    mutationFn: async ({ socialLoginId, email }: { socialLoginId: string; email: string }) => {
      if (!checkNetworkConnection()) return;

      const response = await axiosInstance.post("/api/social/login", {
        email,
        socialLoginId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setLoginData({
        userId: Number(data.userId),
        accessToken: data.accessToken,
      });
      console.log("login", login);
      router.push(login);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.response?.data?.message || "소셜 로그인 과정에서 문제가 발생했습니다.";

      console.error("Error:", errorMessage);
      alert(errorMessage);
      router.replace("/login");
      throw new RequestError(errorMessage);
    },
  });

  const registerEmailMutation = useMutation({
    mutationFn: async (formData: IRegisterEmail) => {
      if (!checkNetworkConnection()) return;

      const response = await axiosInstance.post("/api/users/sign-up", formData);
      return response.data;
    },
    onSuccess: (data) => {
      setLoginData({
        userId: Number(data.userNumber),
        accessToken: data.accessToken,
      });
    },
    onError: (error: any) => {
      console.error(error);
      throw new RequestError(error);
    },
  });

  const registerSocialMutation = useMutation({
    mutationFn: async (formData: IRegisterGoogle | IRegisterKakao) => {
      if (!checkNetworkConnection()) return;
      const { social, ...data } = formData;
      const finalData = { ...data, ageGroup: data.agegroup };
      const path =
        formData.social === "google" ? "/api/social/google/complete-signup" : "/api/social/kakao/complete-signup";

      const response = await axiosInstance.put(path, finalData);
      return response.data;
    },
    onSuccess: (data) => {
      setLoginData({
        userId: Number(data.userNumber),
        accessToken: data.accessToken,
      });
    },
    onError: (error: any) => {
      console.error(error);
      throw new RequestError(error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (!checkNetworkConnection()) return;

      return await axiosInstance.post("/api/logout", {}, { headers: getJWTHeader(accessToken as string) });
    },
    onSuccess: () => {
      clearLoginData();
      resetData();
      setLogin("/");
      setSocialLogin(null, null);
      if (typeof window === "undefined") {
        router.replace("/");
      } else {
        window.location.href = "/";
      }

      queryClient.clear();
    },
    onError: (error: any) => {
      console.error(error);
      throw new RequestError(error);
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/api/token/refresh", {});
      return response.data;
    },
    onSuccess: (data) => {
      setLoginData({
        userId: Number(data.userId),
        accessToken: data.accessToken,
      });
    },
    mutationKey: ["refresh"],
    onError: (error: any) => {
      setIsGuestUser(true);
      console.error(error);
      // if (!isAccessTokenNoNeedpages(pathname)) {
      //   navigate('/login')
      // }
      // throw new RequestError(error)
    },
  });

  return {
    loginEmail: loginEmailMutation.mutate,
    registerEmail: registerEmailMutation.mutate,
    logout: logoutMutation.mutate,
    userPostRefreshToken: refreshTokenMutation.mutate,
    socialLogin: socialLoginMutation.mutate,
    registerSocial: registerSocialMutation.mutate,
    registerSocialMutation,
    socialLoginMutation,
    loginEmailMutation,
    registerEmailMutation,
    logoutMutation,
    refreshTokenMutation,
  };
};

export default useAuth;
