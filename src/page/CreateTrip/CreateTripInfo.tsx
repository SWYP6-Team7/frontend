"use client";
import ThirdStepIcon from "@/components/icons/step/trip/ThirdStepIcon";
import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { ReactNode, useEffect } from "react";
import RecruitingWrapper from "./CreateTripDetail/RecruitingWrapper";
import { palette } from "@/styles/palette";
import EveryBodyIcon from "@/components/icons/EveryBodyIcon";
import OnlyMaleIcon from "@/components/icons/OnlyMaleIcon";
import OnlyFemaleIcon from "@/components/icons/OnlyFemaleIcon";
import { createTripStore } from "@/store/client/createTripStore";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import useViewTransition from "@/hooks/useViewTransition";
import { useRouter } from "next/navigation";
import { isGuestUser } from "@/utils/user";
export const selections = [
  { gender: "모두", icon: (isSelect: boolean) => <EveryBodyIcon selected={isSelect} /> },
  { gender: "남자만", icon: (isSelect: boolean) => <OnlyMaleIcon selected={isSelect} /> },
  { gender: "여자만", icon: (isSelect: boolean) => <OnlyFemaleIcon selected={isSelect} /> },
];

const CreateTripInfo = () => {
  const { genderType, addGenderType } = createTripStore();
  const clickGender = (genderType: string) => {
    addGenderType(genderType);
  };
  const navigateWithTransition = useViewTransition();
  const router = useRouter();
  useEffect(() => {
    if (isGuestUser()) {
      router.replace("/");
    }
  }, [isGuestUser()]);

  const handleNext = () => {
    if (!genderType) return;
    document.documentElement.style.viewTransitionName = "instant";
    navigateWithTransition("/create/trip/tag");
  };

  return (
    <Container>
      <StepIconContainer>
        <ThirdStepIcon />
      </StepIconContainer>
      <Title>여행의 구성은 어떻게 될까요?</Title>
      <Spacing size={20} />
      <RecruitingWrapper />
      <Bar />
      <GenderContainer>
        <DetailTitle>성별 선택</DetailTitle>
        <GenderList>
          {selections.map((item) => (
            <GenderItem isSelected={genderType === item.gender} onClick={() => clickGender(item.gender)}>
              {item.icon(genderType === item.gender)}
              <GenderText>{item.gender}</GenderText>
            </GenderItem>
          ))}
        </GenderList>
      </GenderContainer>
      <ButtonContainer>
        <Button
          onClick={handleNext}
          disabled={!genderType}
          addStyle={
            !genderType
              ? {
                  backgroundColor: "rgba(220, 220, 220, 1)",
                  color: "rgba(132, 132, 132, 1)",
                  boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                }
              : undefined
          }
          text={"다음"}
        />
      </ButtonContainer>
    </Container>
  );
};

const StepIconContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  padding: 0 24px;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  width: 100%;
  height: 1px;
  margin: 32px 0;
`;

const GenderText = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const GenderList = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
`;

const GenderItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  justify-content: center;
  background-color: ${(props) => (props.isSelected ? palette.keycolorBG : palette.검색창)};
  border: ${(props) => (props.isSelected ? `1px solid ${palette.keycolor}` : "0px")};
  border-radius: 20px;
  width: 90px;
  height: 84px;
  color: ${(props) => (props.isSelected ? palette.keycolor : palette.기본)};
  font-weight: ${(props) => (props.isSelected ? 600 : 400)};
`;

const GenderContainer = styled.div``;

const DetailTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: left;
  color: ${palette.비강조};

  padding: 0px 6px;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-left: 6px;
  text-align: left;
`;

export default CreateTripInfo;
