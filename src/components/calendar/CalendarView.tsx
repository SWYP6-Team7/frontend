"use client";
import React from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import CalendarPost from "./CalendarPost";
import { CalendarDay } from "@/utils/calendar";

interface CalendarProps {
  calendarYear: number;
  calendarMonth: number;
  calendarData: CalendarDay[][]; // CalendarDay 타입 사용
  clickNext: () => void;
  clickPrev: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ calendarYear, calendarMonth, calendarData, clickNext, clickPrev }) => {
  return (
    <CalendarContainer>
      <Header>
        <ArrowButton onClick={clickPrev}>{"<"}</ArrowButton>
        <YearMonth>
          {calendarYear}년 {calendarMonth}월
        </YearMonth>
        <ArrowButton onClick={clickNext}>{">"}</ArrowButton>
      </Header>
      <CalendarBody>
        <WeekDays>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
        </WeekDays>
        {calendarData.map((week, weekIdx) => (
          <Week key={weekIdx}>
            {week.map((date, dateIdx) => (
              <Day key={dateIdx} onClick={() => {}}>
                <DateNumber
                  isOtherMonth={date.type === "prev" || date.type === "next"}
                  isHoliday={!!date.holiday || dateIdx % 7 === 0}
                  isToday={date.dayFormat === dayjs().format("YYYYMMDD")}
                >
                  {date.date}
                </DateNumber>
                <HolidayName>{date.holiday?.dateName}</HolidayName>
                {date.posts?.map((post) => <CalendarPost key={post.calendarId} post={post} />)}
                {date.posts && date.posts.length > 0 && <PostCount>{date.posts.length}개</PostCount>}
              </Day>
            ))}
          </Week>
        ))}
      </CalendarBody>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem;
`;

const ArrowButton = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const YearMonth = styled.div`
  font-size: 1.5rem;
`;

const CalendarBody = styled.div`
  width: 100%;
  background-color: white;
  padding: 0 0.75rem;
`;

const WeekDays = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
`;

const WeekDay = styled.div`
  flex: 1;
  border: 1px solid black;
  background-color: #e5e7eb;
`;

const Week = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 6rem;
  @media (min-width: 768px) {
    height: 8rem;
  }
`;

const Day = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px solid black;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DateNumber = styled.small<{ isOtherMonth: boolean; isHoliday: boolean; isToday: boolean }>`
  font-size: 0.75rem;
  margin-left: 0.25rem;
  font-weight: 600;
  color: ${(props) => (props.isOtherMonth ? "#d1d5db" : props.isHoliday ? "#ef4444" : "inherit")};
  ${(props) =>
    props.isToday &&
    `
    background-color: #bfdbfe;
    border-radius: 9999px;
  `}
`;

const HolidayName = styled.small`
  font-size: 0.625rem;
  color: #ef4444;
`;

const PostCount = styled.p`
  position: absolute;
  bottom: 0;
  padding: 0 0.25rem;
  color: #9ca3af;
  font-size: 0.625rem;
  @media (min-width: 768px) {
    font-size: 0.75rem;
  }
`;

export default Calendar;
