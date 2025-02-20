"use client";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ThirdStepIcon from "@/components/icons/ThirdStepIcon";
import { palette } from "@/styles/palette";
import Button from "@/components/designSystem/Buttons/Button";
import { useRouter } from "next/navigation";
import Spacing from "@/components/Spacing";
import RecruitingWrapper from "./RecruitingWrapper";
import DuedateWrapper from "./DuedateWrapper";
import GreenCheckIcon from "@/components/icons/GreenCheckIcon";
import Accordion from "@/components/Accordion";
import SearchFilterTag from "@/components/designSystem/tag/SearchFilterTag";
import { createTripStore } from "@/store/client/createTripStore";
import { useCreateTrip } from "@/hooks/createTrip/useCreateTrip";
import { authStore } from "@/store/client/authStore";
import ButtonContainer from "@/components/ButtonContainer";
import { TAG_LIST } from "@/constants/tags";

const CreateTripDetail = () => {
  const {
    title,
    location,
    details,
    maxPerson,
    genderType,
    dueDate,
    periodType,
    completionStatus,
    tags,
    addCompletionStatus,
    addTags,
    addPeriodType,
    resetCreateTripDetail,
  } = createTripStore();

  const tripDuration = ["일주일 이하", "1~2주", "3~4주", "한 달 이상"];
  const [activeDuration, setActiveDuration] = useState<boolean[]>(new Array(4).fill(false));

  const [taggedArray, setTaggedArray] = useState<string[]>(tags);
  const getTaggedCount = () => {
    return taggedArray.length;
  };

  const { accessToken } = authStore();

  const router = useRouter();

  const travelData = {
    title,
    location,
    details,
    maxPerson,
    genderType,
    dueDate,
    periodType,
    tags,
    completionStatus,
  };
  const { createTripMutate } = useCreateTrip(travelData, accessToken as string); // 여행 생성 api 요청.

  const completeClickHandler = () => {
    if (
      title === "" ||
      location === "" ||
      details === "" ||
      maxPerson === 0 ||
      genderType === "" ||
      dueDate === "" ||
      periodType === "" ||
      tags.length === 0
    ) {
      addCompletionStatus(false);
    }
    createTripMutate(undefined, {
      onSuccess: (data: any) => {
        resetCreateTripDetail();
        if (data) {
          router.push(`/trip/detail/${data.travelNumber}`);
        } else {
          router.push(`/`);
        }
      },
      onError: (e) => {
        console.log(e, "여행 생성에 오류 발생.");
      },
    });
  };

  const durationClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newActiveStates = [false, false, false, false];

    newActiveStates[parseInt(e.currentTarget.id)] = true;
    addPeriodType(tripDuration[parseInt(e.currentTarget.id)]);
    setActiveDuration(newActiveStates); // 상태 업데이트
  };

  const isActive = (tag: string) => {
    return taggedArray.includes(tag);
  };

  const clickTag = (tag: string) => {
    const newArray = taggedArray.includes(tag) ? taggedArray.filter((v) => v !== tag) : [...taggedArray, tag];
    addTags(newArray);
    setTaggedArray(newArray);
  };

  const [initialChecked, setInitialChecked] = useState(false);

  useEffect(() => {
    // 제출시에 값이 지정이 안된 부분은 false로 할당.
    addCompletionStatus(true);
  }, []);

  useEffect(() => {
    if (periodType === "일주일 이하") {
      setActiveDuration([true, false, false, false]);
    } else if (periodType === "1~2주") {
      setActiveDuration([false, true, false, false]);
    } else if (periodType === "3~4주") {
      setActiveDuration([false, false, true, false]);
    } else if (periodType === "한 달 이상") {
      setActiveDuration([false, false, false, true]);
    }
  }, [periodType]);
  return (
    <CreateTripDetailWrapper>
      <CreateTripDetailContainer>
        <StepIconContainer>
          <ThirdStepIcon />
        </StepIconContainer>
        <ContentTitle>
          여행 상세 정보를
          <br /> 입력해주세요.
        </ContentTitle>

        {/* 모집 인원 부분 */}
        <Spacing size={48} />
        <RecruitingWrapper />
        {/* 모집 마감일 부분 */}

        <DuedateWrapper />

        <DurationContainer>
          <DetailTitle>여행 기간</DetailTitle>

          <DurationBox>
            {tripDuration.map((duration, idx) => (
              <DurationBtn
                isActive={activeDuration[idx]}
                key={duration}
                id={idx.toString()}
                onClick={durationClickHandler}
              >
                {duration}
                {activeDuration[idx] && <GreenCheckIcon />}
              </DurationBtn>
            ))}
          </DurationBox>
        </DurationContainer>
        {/* 회색 끝 선 표시 */}
        <div></div>
        <div style={{ marginTop: "29.5px" }}>
          {TAG_LIST.map((item) => (
            <Accordion
              count={getTaggedCount()}
              id="태그 설정"
              title="태그 설정"
              initialChecked={initialChecked}
              key={item.title}
            >
              <TagContainer>
                {item.tags?.map((tag, idx) => (
                  <SearchFilterTag
                    key={tag}
                    idx={idx}
                    addStyle={{
                      backgroundColor: isActive(tag) ? "rgba(227, 239, 217, 1)" : " rgba(240, 240, 240, 1)",
                      color: isActive(tag) ? `${palette.keycolor}` : "rgba(52, 52, 52, 1)",

                      border: isActive(tag) ? `1px solid ${palette.keycolor}` : `1px solid ${palette.검색창}`,
                      borderRadius: "30px",
                      padding: "10px 20px",
                      fontWeight: isActive(tag) ? "600" : "400",
                      lineHeight: "22px",
                    }}
                    text={tag}
                    onClick={() => clickTag(tag)}
                  />
                ))}
              </TagContainer>
            </Accordion>
          ))}
        </div>
        {/* 회색 끝 선 표시 */}

        <Spacing size={120} />
        <div></div>
      </CreateTripDetailContainer>

      <ButtonContainer>
        <Button
          text="완료"
          onClick={completeClickHandler}
          addStyle={{
            backgroundColor: "rgba(62, 141, 0, 1)",
            color: "rgba(240, 240, 240, 1)",
            boxShadow: "rgba(170, 170, 170, 0.1)",
          }}
        />
      </ButtonContainer>
    </CreateTripDetailWrapper>
  );
};

export default CreateTripDetail;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;
const DurationBtn = styled.button<{ isActive: boolean }>`
  width: 48%;
  height: 48px;
  padding: 0px 24px;
  gap: 0px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => (props.isActive ? palette.keycolor : palette.비강조)};
  background-color: ${(props) => (props.isActive ? palette.keycolorBG : palette.검색창)};
  border: ${(props) => (props.isActive ? `1px solid ${palette.keycolor}` : `1px solid ${palette.검색창}`)};
`;

const DurationContainer = styled.div`
  margin-top: 24px;
`;
const DurationBox = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const DetailTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  text-align: left;
  color: ${palette.기본};
  height: 25px;
  padding: 0px 6px;
  gap: 8px;
  opacity: 0px;
`;

const CreateTripDetailWrapper = styled.div`
  position: relative;
`;
const CreateTripDetailContainer = styled.div`
  padding: 0px 24px;
`;
const StepIconContainer = styled.div`
  margin-top: 24px;
`;
const ContentTitle = styled.div`
  margin-top: 40px;
  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;
  color: ${palette.기본};
  text-align: left;
  min-width: 176px;
`;
