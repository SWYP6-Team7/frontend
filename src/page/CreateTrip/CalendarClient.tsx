"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/calendar/CalendarView";
import { CalendarDay, Holiday, Post, setCalendarArray } from "@/utils/calendar";
import dayjs from "dayjs";
import BottomModal from "@/components/BottomModal";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";
import Spacing from "@/components/Spacing";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";

interface CalendarClientProps {
  holidaysArray: {
    year: number;
    month: number;
    holidays: Holiday[];
  }[];
}

const CalendarClient: React.FC<CalendarClientProps> = ({ holidaysArray }) => {
  const [calendarDataArray, setCalendarDataArray] = useState<
    { year: number; month: number; calendarData: CalendarDay[][] }[]
  >([]);
  const [startTime, setStartTime] = useState<string | undefined>();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const initialCalendarDataArray = holidaysArray.map(({ year, month, holidays }) => ({
      year,
      month,
      calendarData: setCalendarArray(year, month, holidays, posts),
    }));
    console.log("initcalendardata", calendarDataArray);

    setCalendarDataArray(initialCalendarDataArray);
  }, [holidaysArray]);

  const handleDateClick = (clickedDate: CalendarDay, year: number, month: number) => {
    if (clickedDate.type !== "now") return;
    const clickedDayjs = dayjs(`${year}-${month.toString().padStart(2, "0")}-${clickedDate.date}`);

    if (clickedDayjs.isBefore(dayjs(), "day")) {
      return;
    }
    let newPost: any = {};
    if (!startTime) {
      newPost = {
        calendarId: Math.random().toString(36).substr(2, 9),
        startTime: clickedDayjs.format("YYYY-MM-DD HH:mm:ss"),
        endTime: clickedDayjs.format("YYYY-MM-DD HH:mm:ss"),

        content: `New post on ${clickedDayjs.format("YYYY-MM-DD")}`,
      };

      setStartTime(clickedDayjs.format("YYYY-MM-DD HH:mm:ss"));
    } else {
      newPost = {
        calendarId: Math.random().toString(36).substr(2, 9),
        startTime: startTime,
        endTime: clickedDayjs.format("YYYY-MM-DD HH:mm:ss"),

        content: `New post on ${clickedDayjs.format("YYYY-MM-DD")}`,
      };
      setStartTime(undefined);
    }
    console.log("post", newPost);
    const updatedPosts = [newPost];
    setPosts(updatedPosts);
    const updatedCalendarDataArray = calendarDataArray.map(({ year, month, calendarData }) => ({
      year,
      month,
      calendarData: setCalendarArray(
        year,
        month,
        holidaysArray.find((h) => h.year === year && h.month === month)?.holidays || [],
        updatedPosts
      ),
    }));

    setCalendarDataArray(updatedCalendarDataArray);
  };
  console.log("calendardata", calendarDataArray);
  if (!calendarDataArray.length) {
    return <></>; // 서버와 클라이언트 모두 동일한 HTML 출력
  }

  return (
    <BottomModal initialHeight={75} closeModal={() => {}}>
      <ModalWrapper>
        <ModalContainer>
          <WeekDays>
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <WeekDay key={day}>{day}</WeekDay>
            ))}
          </WeekDays>
          <Spacing size={20} />
          {calendarDataArray.map((data, index) => (
            <>
              <Calendar
                calendarYear={data.year}
                calendarMonth={data.month}
                calendarData={data.calendarData}
                clickNext={() => {}}
                clickPrev={() => {}}
                onDateClick={(date) => handleDateClick(date, data.year, data.month)}
              />
              <Spacing size={28} />
            </>
          ))}
        </ModalContainer>
      </ModalWrapper>
      <ButtonContainer>
        <Button
          onClick={() => {}}
          disabled={posts.length === 0}
          addStyle={
            posts.length === 0
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
    </BottomModal>
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
