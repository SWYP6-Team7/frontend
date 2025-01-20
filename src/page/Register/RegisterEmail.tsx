"use client";
import Button from "@/components/designSystem/Buttons/Button";
import StateInputField from "@/components/designSystem/input/StateInputField";
import InfoText from "@/components/designSystem/text/InfoText";
import Spacing from "@/components/Spacing";
import Terms from "@/components/Terms";
import { userStore } from "@/store/client/userStore";
import styled from "@emotion/styled";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { checkEmail } from "@/api/user";
import ButtonContainer from "@/components/ButtonContainer";
import { emailSchema, passwordSchema } from "@/utils/schema";
import useViewTransition from "@/hooks/useViewTransition";
import { useRouter } from "next/navigation";
import ValidationInputField from "@/components/designSystem/input/ValidationInputField";
import useVerifyEmail from "@/hooks/useVerifyEmail";
import { errorStore } from "@/store/client/errorStore";
interface ErrorProps {
  email: undefined | string;
}

const RegisterEmail = () => {
  const { addEmail, email, socialLogin, setSocialLogin } = userStore();
  const { updateError, setIsMutationError } = errorStore();
  const [showTerms, setShowTerms] = useState(true);
  const { verifyEmailSend } = useVerifyEmail();
  const [formData, setFormData] = useState({
    email: email,
  });
  const [success, setSuccess] = useState({
    email: false,
  });
  const [error, setError] = useState<ErrorProps>({
    email: undefined,
  });
  const [shake, setShake] = useState({
    email: false,
  });
  const navigateWithTransition = useViewTransition();
  const router = useRouter();
  const isSocialLoginGoogle = socialLogin === "google";
  const isSocialLoginKakao = socialLogin === "kakao";
  const isSocialLoginNaver = socialLogin === "naver";
  const isRegisterEmail = socialLogin === null;
  const allSuccess = isSocialLoginKakao ? success.email : Object.values(success).every((value) => value);

  const closeShowTerms = () => {
    setShowTerms(false);
  };

  useEffect(() => {
    if (isSocialLoginGoogle || isSocialLoginNaver) {
      setSocialLogin(null, null);
      router.replace("/login");
    }
  }, [socialLogin]);

  const handleRemoveValue = (name: "email") => {
    setSuccess((prev) => ({ ...prev, [name]: false }));
    setFormData((prev) => ({ ...prev, [name]: "" }));
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (name === "email") {
      const emailValidation = emailSchema.safeParse(value);
      if (!emailValidation.success) {
        setError((prev) => ({
          ...prev,
          email: emailValidation.error.flatten().formErrors[0],
        }));
      } else {
        setError((prev) => ({
          ...prev,
          email: undefined,
        }));
      }

      setSuccess((prev) => ({
        ...prev,
        email: emailValidation.success,
      }));
    }
  };

  useEffect(() => {
    if (!verifyEmailSend.isPending && verifyEmailSend.isError) {
      updateError(new Error("이메일 발송 과정에서 에러가 발생했어요"));
      setIsMutationError(true);
    }
    if (verifyEmailSend.isSuccess) {
      addEmail(formData.email);
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition("/verifyEmail");
    }
  }, [verifyEmailSend.isPending, verifyEmailSend.isError, verifyEmailSend.isSuccess]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (allSuccess) {
      const checkingEmail = await checkEmail(formData.email);
      if (!checkingEmail) {
        setShake((prev) => ({
          ...prev,
          email: true,
        }));
        setError((prev) => ({ ...prev, email: "이미 사용중인 이메일입니다." }));
        setTimeout(() => {
          setShake({ email: false });
        }, 500);
        return;
      }

      verifyEmailSend.mutate({ email: formData.email });
    } else {
      setShake({
        email: Boolean(error.email),
      });

      setTimeout(() => {
        setShake({ email: false });
      }, 500);
    }
  };

  return (
    <>
      {showTerms && <Terms closeShowTerms={closeShowTerms} />}
      <Container onSubmit={handleSubmit}>
        <FieldContainer>
          <Label htmlFor="email">이메일 주소를 입력해주세요</Label>
          <Spacing size={16} />
          <ValidationInputField
            handleRemoveValue={() => handleRemoveValue("email")}
            type="email"
            name="email"
            onChange={changeValue}
            value={formData.email}
            hasError={Boolean(error.email)}
            success={success.email}
            placeholder="이메일 입력"
            shake={shake.email}
            message={error.email ?? ""}
          />
        </FieldContainer>

        <Spacing size={"6svh"} />

        <ButtonContainer>
          {allSuccess ? (
            <Button text="다음" />
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
    </>
  );
};

const Container = styled.form`
  padding: 0 24px;

  padding-top: 30px;
`;

const FieldContainer = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
`;

const Label = styled.label`
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  padding: 0 6px;
  letter-spacing: -0.04;
`;
export default RegisterEmail;
