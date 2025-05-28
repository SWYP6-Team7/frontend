"use client";
import React, { useState } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { CalendarDay } from "@/utils/calendar";
import { palette } from "@/styles/palette";
import isBetween from "dayjs/plugin/isBetween";
import Spacing from "../Spacing";

// isBetween 플러그인 확장 추가
dayjs.extend(isBetween);

interface CalendarProps {
  calendarYear: number;
  calendarMonth: number;
  calendarData: CalendarDay[][];
  clickNext: () => void;
  clickPrev: () => void;
  onDateClick: (date: CalendarDay) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  calendarYear,
  calendarMonth,
  calendarData,
  clickNext,
  clickPrev,
  onDateClick,
}) => {
  console.log(calendarData);
  return (
    <CalendarContainer>
      <Header>
        {calendarYear}년 {calendarMonth}월
      </Header>
      <CalendarBody>
        {calendarData.map((week, weekIdx) => (
          <>
            <Week key={weekIdx}>
              {week.map((date, dateIdx) => (
                <Day key={dateIdx} onClick={() => onDateClick(date)}>
                  <DateNumber
                    isStart={date.posts && date.posts[0]?.start}
                    isEnd={
                      date.posts &&
                      date.posts[0]?.endTime &&
                      dayjs(date.dayFormat).isSame(
                        dayjs(date.posts[0].endTime),
                        "day"
                      )
                    }
                    isMultiple={date.posts && date.posts[0]?.multiple}
                    isPrevDay={dayjs(date.dayFormat).isBefore(dayjs(), "day")}
                    isOtherMonth={date.type === "prev" || date.type === "next"}
                    // isHoliday={!!date.holiday || dateIdx % 7 === 0}
                    isToday={date.dayFormat === dayjs().format("YYYYMMDD")}
                    isSelected={date.type === "now"}
                  >
                    {date.date}
                  </DateNumber>
                  {/* <HolidayName>{date.holiday?.dateName}</HolidayName> */}
                  <PostContainer
                    isStart={date.posts && date.posts[0]?.start}
                    isEnd={
                      date.posts &&
                      date.posts[0]?.endTime &&
                      dayjs(date.dayFormat).isSame(
                        dayjs(date.posts[0].endTime),
                        "day"
                      )
                    }
                    isSelect={date.posts && date.posts[0]?.startTime}
                    isMultiple={date.posts && date.posts[0]?.multiple}
                  />
                  <MultipleBorder
                    isStart={date.posts && date.posts[0]?.start}
                    isEnd={
                      date.posts &&
                      date.posts[0]?.endTime &&
                      dayjs(date.dayFormat).isSame(
                        dayjs(date.posts[0].endTime),
                        "day"
                      )
                    }
                    isMultiple={date.posts && date.posts[0]?.multiple}
                  />
                </Day>
              ))}
            </Week>
            {weekIdx !== calendarData.length - 1 && <Spacing size={16} />}
          </>
        ))}
      </CalendarBody>
    </CalendarContainer>
  );
};

const MultipleBorder = styled.div<{
  isMultiple: boolean;
  isStart: boolean;
  isEnd: boolean;
}>`
  width: 50%;
  position: absolute;
  height: 42px;
  top: 0;

  ${(props) =>
    props.isStart || props.isEnd
      ? props.isMultiple
        ? `
      
        ${
          props.isStart
            ? `
            right: 0;
            border-top: 1px solid ${palette.keycolor};
            border-bottom: 1px solid ${palette.keycolor};
          `
            : props.isEnd
              ? `
              left: 0;
          border-top: 1px solid ${palette.keycolor};
          border-bottom: 1px solid ${palette.keycolor};
    `
              : ""
        } 
     
    

 
    `
        : ""
      : ""}
`;
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  justify-content: center;
`;

const PostContainer = styled.div<{
  isMultiple: boolean;
  isSelect: boolean;
  isStart: boolean;
  isEnd: boolean;
}>`
  position: absolute;

  width: 100%;

  height: 42px;
  ${(props) =>
    props.isStart || props.isEnd
      ? props.isMultiple
        ? `
        border: 1px solid ${palette.keycolor};
      width: 42px;
        ${
          props.isStart
            ? `
          
          border-right: 0px; 
          border-top-left-radius: 50%; 
          border-bottom-left-radius: 50%; 

    `
            : props.isEnd
              ? `
           
           border-left : 0px; 
          border-top-right-radius: 50%; 
          border-bottom-right-radius: 50%; 
  
    `
              : ""
        } 
    
    

 
    `
        : `
    width: 42px;
    border-radius: 50%;
    border: 1px solid ${palette.keycolor}
    `
      : props.isSelect
        ? `
    width: 100%;
    border-top: 1px solid ${palette.keycolor};
    border-bottom: 1px solid ${palette.keycolor};
    `
        : ""}
`;

const Header = styled.div`
  padding-left: 4px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: ${palette.기본};
  margin-bottom: 8px;
  width: 100%;
`;

const CalendarBody = styled.div`
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
`;

const Week = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const Day = styled.div`
  position: relative;
  width: 100%;
  height: 42px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
`;

const DateNumber = styled.div<{
  isPrevDay: boolean;
  isOtherMonth: boolean;
  isSelect: boolean;
  isToday: boolean;
  isMultiple: boolean;
  isStart: boolean;
  isEnd: boolean;
}>`
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  height: 42px;
  line-height: 42px;
  text-align: center;

  cursor: ${(props) => (props.isPrevDay ? "auto" : "pointer")};
  ${(props) =>
    props.isToday &&
    `
    width: 42px;
    background-color: ${palette.비강조5};
    border-radius: 9999px;
  `}
  color: ${(props) =>
    props.isOtherMonth
      ? "transparent"
      : props.isPrevDay
        ? palette.비강조2
        : props.isSelect
          ? palette.keycolor
          : palette.기본};
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
