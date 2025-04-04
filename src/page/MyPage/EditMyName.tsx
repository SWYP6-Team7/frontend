"use client";
import Button from "@/components/designSystem/Buttons/Button";
import ButtonContainer from "@/components/ButtonContainer";
import StateInputField from "@/components/designSystem/input/StateInputField";
import InfoText from "@/components/designSystem/text/InfoText";
import Spacing from "@/components/Spacing";
import useMyPage from "@/hooks/myPage/useMyPage";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ValidationInputField from "@/components/designSystem/input/ValidationInputField";
// 한글만 허용하고 최대 10자로 제한.
const koreanOnly = z
  .string()
  .regex(/^[ㄱ-ㅎ|가-힣]+$/, { message: "한글만 입력 가능합니다." })
  .max(10, { message: "최대 10자까지 입력 가능합니다." });
export default function EditMyName() {
  const router = useRouter();
  const { name, addName, addIsNameUpdated } = myPageStore();
  const [userName, setUserName] = useState(name);
  const { updateMyPageMutation, isUpdatedSuccess } = useMyPage();
  const handleRemoveValue = () => setUserName("");
  const completeClickHandler = () => {
    //   변경 요청 보냄
    if (userName === name) {
      return;
    }
    updateMyPageMutation();
    addName(userName);
  };
  useEffect(() => {
    if (isUpdatedSuccess) {
      addIsNameUpdated(true);
      router.back();
    }
  }, [isUpdatedSuccess]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);

    if (koreanOnly.safeParse(e.target.value).success) {
      setNameValidError(false);
    } else {
      setNameValidError(true);
    }
  };
  const [nameValidError, setNameValidError] = useState(false);
  return (
    <Wrapper>
      <StepContent>새로운 이름을 입력해주세요</StepContent>
      <div style={{ marginTop: "14px" }}>
        <ValidationInputField
          type={"text"}
          name={"newUserName"}
          shake={nameValidError && userName.length > 0}
          success={userName.length > 0 && !nameValidError}
          hasError={nameValidError && userName.length > 0}
          placeholder="이름 입력(최대 10자)"
          value={userName}
          onChange={(e) => inputChangeHandler(e)}
          handleRemoveValue={handleRemoveValue}
          message=" 최대 10자의 한글만 입력할 수 있습니다.(띄어쓰기 불가)"
        />
      </div>

      <ButtonContainer>
        <Button
          text="변경 완료"
          onClick={completeClickHandler}
          disabled={!(userName.length > 0 && !nameValidError) || userName === name}
          addStyle={
            location.pathname == "/registerName"
              ? userName.length > 0 && !nameValidError
                ? {
                    backgroundColor: "rgba(62, 141, 0, 1)",
                    color: "rgba(240, 240, 240, 1)",
                    boxShadow: "rgba(170, 170, 170, 0.1)",
                  }
                : {
                    backgroundColor: "rgba(220, 220, 220, 1)",
                    color: "rgba(132, 132, 132, 1)",
                  }
              : userName.length > 0 && !nameValidError
                ? {
                    backgroundColor: "rgba(62, 141, 0, 1)",
                    color: "rgba(240, 240, 240, 1)",
                    boxShadow: "rgba(170, 170, 170, 0.1)",
                  }
                : {
                    backgroundColor: "rgba(220, 220, 220, 1)",
                    color: "rgba(132, 132, 132, 1)",
                  }
          }
        />
      </ButtonContainer>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  padding: 0px 24px;
  margin-top: 24px;
`;
const StepContent = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.025em;
  text-align: left;
  color: ${palette.기본};
`;
