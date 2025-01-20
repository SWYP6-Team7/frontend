"use client";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { errorStore } from "@/store/client/errorStore";
import { userStore } from "@/store/client/userStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ResultToast from "./designSystem/toastMessage/resultToast";
const MINUTES_IN_MS = 60 * 1000;
const INTERVAL = 1000;

const VerifyTimer = () => {
  const { email } = userStore();
  const [isToastShow, setIsToastShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const minutes = String(Math.floor(timeLeft / (1000 * 60))).padStart(2, "0");
  const second = String(Math.floor(timeLeft / 1000));
  const { verifyEmailSend } = useVerifyEmail();
  const { updateError, setIsMutationError } = errorStore();
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (!verifyEmailSend.isPending && verifyEmailSend.isError) {
      updateError(new Error("이미 발송된 이메일입니다. 1분 뒤에 다시 시도해주세요."));
      setIsMutationError(true);
    }
    if (verifyEmailSend.isSuccess) {
      setIsToastShow(true);
      setTimeLeft(MINUTES_IN_MS);
    }
  }, [verifyEmailSend.isPending, verifyEmailSend.isError, verifyEmailSend.isSuccess]);

  const onClickRequest = () => {
    verifyEmailSend.mutate({ email });
  };

  if (timeLeft < 1) {
    return (
      <Container>
        <ResultToast bottom="80px" isShow={isToastShow} setIsShow={setIsToastShow} text="인증 코드를 재전송했어요" />
        <ReqeustCodeButton onClick={onClickRequest}>코드가 전송되지 않았나요?</ReqeustCodeButton>
      </Container>
    );
  }
  return (
    <Container>
      <ResultToast bottom="80px" isShow={isToastShow} setIsShow={setIsToastShow} text="인증 코드를 재전송했어요" />
      <TimeText>코드 재전송까지 {second}초</TimeText>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: ${palette.비강조};
`;

const ReqeustCodeButton = styled.button`
  font-weight: 600;

  line-height: 16px;
  font-size: 14px;
  letter-spacing: -0.025em;
  color: ${palette.keycolor};
  text-decoration: underline;
`;
export default VerifyTimer;
