"use client";
import React, { useState, useEffect } from "react";
import { CalendarDay, Holiday, Post, setCalendarArray } from "@/utils/calendar";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";
import Spacing from "@/components/Spacing";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import { createTripStore } from "@/store/client/createTripStore";
import CalendarIcon from "@/components/icons/Calendar";
import SecondStepIcon from "@/components/icons/SecondStepIcon";
import useViewTransition from "@/hooks/useViewTransition";
import CalendarModal from "./CalendarModal";
interface CalendarClientProps {
  holidaysArray: {
    year: number;
    month: number;
    holidays: Holiday[];
  }[];
}

export function formatDateRange(startDate, endDate) {
  console.log(startDate, endDate);
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (start.isSame(end, "month")) {
    // 같은 달일 경우
    return `${start.format("M월 D일")} - ${end.format("D일")}`;
  } else {
    // 다른 달일 경우
    return `${start.format("M월 D일")} - ${end.format("M월 D일")}`;
  }
}

const CalendarClient: React.FC<CalendarClientProps> = ({ holidaysArray }) => {
  const [showModal, setShowModal] = useState(false);

  const navigateWithTransition = useViewTransition();

  const { date } = createTripStore();

  const handleNextStep = () => {
    if (!date) return;
    document.documentElement.style.viewTransitionName = "instant";
    navigateWithTransition("/create/trip/info");
  };

  return (
    <>
      <CalendarModal showModal={showModal} setShowModal={setShowModal} />
      <Container>
        <StepIconContainer>
          <SecondStepIcon />
        </StepIconContainer>
        <Title>여행 날짜를 선택해 주세요</Title>
        <Spacing size={8} />
        <DuedateBtn onClick={() => setShowModal(true)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CalendarIcon />

            <DueDateValue isDate={Boolean(date)}>
              {date
                ? formatDateRange(date.startDate, date.endDate)
                : "날짜를 선택하세요."}
            </DueDateValue>
          </div>
        </DuedateBtn>
        <ButtonContainer>
          <Button
            onClick={handleNextStep}
            disabled={date === null}
            addStyle={
              date === null
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
    </>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const WeekDays = styled.div`
  position: absolute;
  display: flex;
  width: calc(100% - 48px);
  top: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
  font-size: 14px;
  line-height: 28px;
  font-weight: 600;
  color: ${palette.비강조};
  text-align: center;
`;

const StepIconContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  padding: 0 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-left: 6px;
  text-align: left;
`;

const DueDateValue = styled.div<{ isDate: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => (props.isDate ? 500 : 400)};
  line-height: 20px;
  text-align: center;
  margin-left: 8px;
  color: ${(props) => (props.isDate ? palette.기본 : palette.비강조2)};
`;

const DuedateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${palette.검색창};
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  gap: 0px;
  border-radius: 20px;

  opacity: 0px;
`;

const ModalContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 20px;
  margin-top: 45px;
  padding-bottom: 104px;

  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    // 부모와 동일하게 함(나중에 절전모드, 밤모드 추가되면 수정하기 번거로우니까... 미리 보이는 노동은 최소화)
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    // 동글동글한 회색 바를 만든다.
    border-radius: 1rem;

    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
`;

const WeekDay = styled.div`
  flex: 1;

  height: 28px;
  text-align: center;
`;

export default CalendarClient;
