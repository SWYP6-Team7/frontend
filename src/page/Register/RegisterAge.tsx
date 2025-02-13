"use client";
import SecondStepIcon from "@/components/icons/SecondStepIcon";
import Button from "@/components/designSystem/Buttons/Button";
import styled from "@emotion/styled";
import { userStore } from "@/store/client/userStore";
import { createContext, useContext, useEffect, useState } from "react";
import SearchFilterTag from "@/components/designSystem/tag/SearchFilterTag";
import { palette } from "@/styles/palette";
import ButtonContainer from "@/components/ButtonContainer";
import useViewTransition from "@/hooks/useViewTransition";
import { useRouter } from "next/navigation";

type RegisterAgeContextType = {
  genderCheck: boolean;
  setGenderCheck: (value: boolean) => void;
};

export const RegisterAgeContext = createContext<RegisterAgeContextType | undefined>(undefined);

export const useRegisterAge = () => {
  const context = useContext(RegisterAgeContext);
  if (context === undefined) {
    throw new Error("useRegisterAge must be used within a RegisterAgeProvider");
  }
  return context;
};

const AGE_LIST = ["10대", "20대", "30대", "40대", "50대 이상"];

const RegisterAge = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { agegroup, addAgegroup, email, name, resetForm, resetName, socialLogin, setSocialLogin } = userStore();
  const [genderCheck, setGenderCheck] = useState(false);
  const isEmailRegister = socialLogin === null;
  const isSocialLoginKakao = socialLogin === "kakao";
  const isSocialLoginNaver = socialLogin === "naver";
  const navigateWithTransition = useViewTransition();
  const nextStepClickHandler = () => {
    if (agegroup) {
      if (location.pathname == "/registerAge") {
        console.log(1);
        router.push("/registerAge/registerGender");
      } else if (genderCheck && location.pathname == "/registerAge/registerGender") {
        document.documentElement.style.viewTransitionName = "forward";
        navigateWithTransition("/registerTripStyle");
      }
    }
  };

  useEffect(() => {
    if (isSocialLoginNaver) {
      resetName();
      resetForm();
      setSocialLogin(null, null);
      router.replace("/login");
    } else if (isSocialLoginKakao || isEmailRegister) {
      if (!email && !name) {
        resetName();
        resetForm();
        router.push("/registerEmail");
      }
    }
  }, [email, name]);

  const handleClickage = (age: string) => {
    addAgegroup(age);
  };

  return (
    <RegisterAgeContext.Provider value={{ genderCheck, setGenderCheck }}>
      <RegisterAgeWrapper>
        <StepIconContainer>
          <SecondStepIcon />
        </StepIconContainer>

        <AgeStep>
          <Content>나이가 어떻게 되세요?</Content>
          <AgeList>
            {AGE_LIST.map((age, idx) => (
              <SearchFilterTag
                addStyle={{
                  backgroundColor: agegroup === age ? "rgba(227, 239, 217, 1)" : " rgba(240, 240, 240, 1)",
                  color: agegroup === age ? `${palette.keycolor}` : "rgba(52, 52, 52, 1)",
                  borderRadius: "30px",
                  fontSize: "16",
                  lineHeight: "22px",
                  padding: "10px 20px",
                  border: agegroup === age ? `1px solid ${palette.keycolor}` : "none",
                }}
                idx={idx}
                onClick={() => handleClickage(age)}
                text={age}
                key={age}
              />
            ))}
          </AgeList>
        </AgeStep>
        {children}
        <ButtonContainer>
          <Button
            text="다음"
            onClick={nextStepClickHandler}
            disabled={!Boolean(agegroup)}
            addStyle={
              true
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
      </RegisterAgeWrapper>
    </RegisterAgeContext.Provider>
  );
};

export default RegisterAge;

const AgeList = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 16px;
  width: 70%;
`;

const RegisterAgeWrapper = styled.div`
  padding: 0px 24px;

  min-height: calc(100svh - 68px - 30px);
`;
const StepIconContainer = styled.div`
  margin-top: 30px;
`;

const AgeStep = styled.div`
  margin-top: 40px;
`;
const Content = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding: 0px 6px;
  padding-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  right: 24px;
  left: 24px;
  position: absolute;
  bottom: 4.7svh;
`;
