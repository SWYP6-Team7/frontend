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
interface ErrorProps {
  password: undefined | string;
  confirmPassword: undefined | string;
}

const RegisterPassword = () => {
  const { addPassword, email, password, socialLogin, setSocialLogin } = userStore();

  const [formData, setFormData] = useState({
    password: password,
    confirmPassword: password,
  });
  const [success, setSuccess] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState<ErrorProps>({
    password: undefined,
    confirmPassword: undefined,
  });
  const [shake, setShake] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigateWithTransition = useViewTransition();
  const router = useRouter();
  const isSocialLoginGoogle = socialLogin === "google";
  const isSocialLoginKakao = socialLogin === "kakao";
  const isSocialLoginNaver = socialLogin === "naver";
  const isRegisterEmail = socialLogin === null;
  const allSuccess = Object.values(success).every((value) => value);

  useEffect(() => {
    if (isSocialLoginGoogle || isSocialLoginNaver || isSocialLoginKakao) {
      setSocialLogin(null, null);
      router.replace("/login");
    }
  }, [socialLogin]);

  const handleRemoveValue = (name: "password" | "confirmPassword") => {
    setSuccess((prev) => ({ ...prev, [name]: false }));
    setFormData((prev) => ({ ...prev, [name]: "" }));
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (name === "password") {
      const passwordValidation = passwordSchema.safeParse(value);
      let passwordError = false;
      const emailLocalPart = email.split("@")[0];
      if (value === email || value === emailLocalPart) {
        passwordError = true;
      }
      if (!passwordValidation.success || passwordError) {
        if (passwordError) {
          setError((prev) => ({
            ...prev,
            password: "이메일과 동일한 형식의 비밀번호는 사용할 수 없습니다.",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            password: passwordValidation.error!.flatten().formErrors[0],
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          password: undefined,
        }));
      }
      setSuccess((prev) => ({
        ...prev,
        password: passwordValidation.success && !passwordError,
      }));
    } else {
      if (formData.password !== value) {
        setError((prev) => ({
          ...prev,
          confirmPassword: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          confirmPassword: undefined,
        }));
      }
      setSuccess((prev) => ({
        ...prev,
        confirmPassword: formData.password === value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (allSuccess) {
      addPassword(formData.password);
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition("/registerName");
      if (isSocialLoginKakao) {
        document.documentElement.style.viewTransitionName = "forward";
        navigateWithTransition("/registerAge");
      } else {
        document.documentElement.style.viewTransitionName = "forward";
        navigateWithTransition("/registerName");
      }
    } else {
      setShake({
        password: Boolean(error.password),
        confirmPassword: Boolean(error.confirmPassword),
      });

      setTimeout(() => {
        setShake({ password: false, confirmPassword: false });
      }, 500);
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit}>
        {isRegisterEmail && (
          <>
            <FieldContainer>
              <Label htmlFor="password">비밀번호를 입력해주세요</Label>
              <Spacing size={16} />
              <StateInputField
                handleRemoveValue={() => handleRemoveValue("password")}
                type="password"
                onChange={changeValue}
                shake={shake.password}
                name="password"
                placeholder="비밀번호 입력"
                hasError={Boolean(error.password)}
                value={formData.password}
                success={success.password}
              />
              <Spacing size={16} />
              <div style={{ paddingLeft: 6 }}>
                {error.password ? (
                  <InfoText hasError>{error.password}</InfoText>
                ) : success.password ? (
                  <InfoText success>영문 대문자, 특수문자 포함 8~20자</InfoText>
                ) : (
                  <InfoText>영문 대문자, 특수문자 포함 8~20자</InfoText>
                )}
              </div>
            </FieldContainer>

            <Spacing size={14} />
            <FieldContainer>
              <ValidationInputField
                shake={shake.confirmPassword}
                handleRemoveValue={() => handleRemoveValue("confirmPassword")}
                type="password"
                name="confirmPassword"
                placeholder="비밀번호 재입력"
                onChange={changeValue}
                hasError={Boolean(error.confirmPassword)}
                value={formData.confirmPassword}
                success={success.confirmPassword}
                message={error.confirmPassword ?? ""}
              />
            </FieldContainer>
          </>
        )}
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
export default RegisterPassword;
