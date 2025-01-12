"use client";
import Button from "@/components/designSystem/Buttons/Button";
import ButtonContainer from "@/components/ButtonContainer";
import StateInputField from "@/components/designSystem/input/StateInputField";
import InfoText from "@/components/designSystem/text/InfoText";
import { passwordSchema } from "@/utils/schema";
import Spacing from "@/components/Spacing";
import useMyPage from "@/hooks/myPage/useMyPage";
import { userStore } from "@/store/client/userStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
interface ErrorProps {
  password: undefined | string;
}

export default function EditMyPassword() {
  const { verifyPasswordMutation, isVerifiedError, isVerified } = useMyPage();
  const [showTerms, setShowTerms] = useState(true);
  const [formData, setFormData] = useState({
    password: "",
  });
  const [success, setSuccess] = useState({
    password: false,
  });
  const [error, setError] = useState<ErrorProps>({
    password: undefined,
  });
  const [shake, setShake] = useState({
    password: false,
  });
  const { addPassword } = userStore();
  const router = useRouter();
  const allSuccess = Object.values(success).every((value) => value);

  const handleRemoveValue = () => {
    console.log(name);
    setSuccess((prev) => ({ password: false }));
    setFormData((prev) => ({ password: "" }));
  };

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (name === "password") {
      const passwordValidation = passwordSchema.safeParse(value);
      let passwordError = false;

      if (!passwordValidation.success || passwordError) {
        if (passwordError) {
          setError((prev) => ({
            ...prev,
            password: "",
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
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (allSuccess) {
      try {
        const result = await verifyPasswordMutation(formData.password);
        if (result === undefined) {
          throw new Error("비밀번호가 틀렸습니다.");
        }

        addPassword(formData.password);
        router.push("/editMyPassword2");
        return;
      } catch (e) {
        // 틀리면 500에러
        console.log(e);
        setShake((prev) => ({
          ...prev,
          password: true,
        }));
        setSuccess({ password: false });
        setError((prev) => ({ ...prev, password: "비밀 번호가 틀렸습니다" }));
        setTimeout(() => {
          setShake({ password: false });
        }, 500);
        return;
      }
    } else {
      setShake({
        password: Boolean(error.password),
      });

      setTimeout(() => {
        setShake({ password: false });
      }, 500);
    }
  };

  return (
    <>
      <Container onSubmit={handleSubmit}>
        <FieldContainer>
          <Label htmlFor="password">현재 비밀번호를 입력해주세요</Label>
          <Spacing size={16} />
          <StateInputField
            handleRemoveValue={handleRemoveValue}
            type="password"
            onChange={changeValue}
            shake={shake.password}
            name="password"
            placeholder="현재 비밀번호"
            hasError={Boolean(error.password)}
            value={formData.password}
            success={success.password}
          />
          <Spacing size={10} />
          {error.password && <InfoText hasError>{error.password}</InfoText>}
        </FieldContainer>

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
              disabled={true}
            />
          )}
        </ButtonContainer>
      </Container>
    </>
  );
}

const Container = styled.form`
  padding: 0 24px;
  margin-top: 24px;
`;

const FieldContainer = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  color: ${palette.기본};
  text-align: left;
`;
