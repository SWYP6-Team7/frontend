"use client";
import React, { useEffect } from "react";

import { getToken } from "@/api/user";
import { userStore } from "@/store/client/userStore";
import useAuth from "@/hooks/user/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

const OauthNaver = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code"); // 네이버에서 받은 인증 코드
  const state = searchParams?.get("state");
  const { socialLogin, socialLoginMutation } = useAuth();
  const { setSocialLogin } = userStore();
  const { isSuccess, isPending, isError } = socialLoginMutation;
  // useEffect(() => {
  //   if (socialLoginMutation.isSuccess) {
  //     router.push("/");
  //     setSocialLogin("naver", null);
  //   }
  // }, [isSuccess]);

  useEffect(() => {
    if (code && state) {
      // 네이버 인증 코드를 이용해 서버에서 토큰을 요청

      getToken("naver", code, state)
        .then((user) => {
          console.log("user client", user);
          if (user?.userStatus === "ABLE") {
            socialLogin({
              socialLoginId: user?.socialLoginId as string,
              email: user?.email as string,
            });
          } else {
            alert("소셜 로그인 과정에서 문제가 발생했습니다.");
            router.push("/login");
          }
        })
        .catch((error) => {
          alert(error?.error ? error.error : "소셜 로그인 과정에서 문제가 발생했습니다.");
          router.replace("/login");
        });
    }
  }, [code, state]);

  return null;
};

export default OauthNaver;
