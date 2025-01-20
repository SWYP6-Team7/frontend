"use client";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import CodeInput from "@/components/designSystem/input/CodeInput";
import Spacing from "@/components/Spacing";
import VerifyTimer from "@/components/VerifyTimer";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import useViewTransition from "@/hooks/useViewTransition";
import { errorStore } from "@/store/client/errorStore";
import { userStore } from "@/store/client/userStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const VerifyEmail = () => {
  const [values, setValues] = useState("");
  const navigateWithTransition = useViewTransition();
  const { email, socialLogin, setSocialLogin } = userStore();
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyEmail } = useVerifyEmail();
  const { updateError, setIsMutationError } = errorStore();

  const isSocialLoginGoogle = socialLogin === "google";
  const isSocialLoginKakao = socialLogin === "kakao";
  const isSocialLoginNaver = socialLogin === "naver";
  const handleValueChange = (newValues: string[]) => {
    setValues(newValues.join(""));
  };

  useEffect(() => {
    if (isSocialLoginGoogle || isSocialLoginNaver) {
      setSocialLogin(null, null);
      router.replace("/login");
    }
  }, [socialLogin]);
  const submitVerifyCode = () => {
    if (values.length !== 6) {
      return;
    }
    verifyEmail.mutate({ verifyCode: values });
  };

  useEffect(() => {
    if (!verifyEmail.isPending && verifyEmail.isError) {
      updateError(new Error("이메일 발송 과정에서 에러가 발생했어요"));
      setIsMutationError(true);
    }
    if (verifyEmail.isSuccess) {
      if (isSocialLoginKakao) {
        document.documentElement.style.viewTransitionName = "forward";
        navigateWithTransition("/registerAge");
      } else {
        document.documentElement.style.viewTransitionName = "forward";
        navigateWithTransition("/registerPassword");
      }
    }
  }, [verifyEmail.isPending, verifyEmail.isError, verifyEmail.isSuccess]);

  return (
    <Container>
      <Label>코드를 입력해주세요</Label>
      <Spacing size={8} />
      <SubLabel>
        입력하신 이메일 <sub>{email}</sub>(으)로 인증 코드를 보냈어요.
      </SubLabel>
      <Spacing size={28} />
      <CodeInput refs={inputRefs} onValueChange={handleValueChange} />
      <Spacing size={40} />
      <VerifyTimer />
      <ButtonContainer>
        {values.length === 6 ? (
          <Button text="다음" onClick={submitVerifyCode} />
        ) : (
          <Button
            text="다음"
            addStyle={{
              backgroundColor: "rgba(220, 220, 220, 1)",
              color: "rgba(132, 132, 132, 1)",
              boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
            }}
            type="submit"
            disabled={true}
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 25px;
  padding-top: 30px;
`;

const Label = styled.label`
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  padding: 0 6px;
  letter-spacing: -0.04;
`;

const SubLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${palette.비강조};
  padding: 0 6px;
  line-height: 140%;
  letter-spacing: -0.025em;
  & sub {
    color: #000;
  }
`;

export default VerifyEmail;
