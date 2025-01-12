"use client";
import React, { useEffect } from "react";
import { getToken } from "@/api/user";
import { userStore } from "@/store/client/userStore";
import useAuth from "@/hooks/user/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

const OauthKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code"); // 카카오에서 받은 인증 코드
  const state = searchParams?.get("state");
  const { setSocialLogin, setTempName } = userStore();
  const { socialLogin, socialLoginMutation } = useAuth();
  const { isError, isSuccess } = socialLoginMutation;

  useEffect(() => {
    if (socialLoginMutation.isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(code, state, "code");
    if (code && state) {
      getToken("kakao", code, state)
        .then((user) => {
          console.log("user client", user);
          if (user?.userStatus === "PENDING" && user?.userNumber && user?.userName) {
            setTempName(user.userName);
            setSocialLogin("kakao", Number(user.userNumber) as number);
            router.push("/registerForm");
          } else if (user?.userStatus === "ABLE") {
            socialLogin({
              socialLoginId: user?.socialLoginId as string,
              email: user?.userEmail as string,
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

export default OauthKakao;
