"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { axiosInstance } from "@/api";
import Calendar from "@/components/calendar/CalendarView";
import { CalendarDay, Holiday, Post, setCalendarArray } from "@/utils/calendar";

const CalendarPage: React.FC = () => {
  const [calendarYear, setCalendarYear] = useState(dayjs().year());
  const [calendarMonth, setCalendarMonth] = useState(dayjs().month() + 1);
  const [calendarData, setCalendarData] = useState<CalendarDay[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = calendarYear.toString();
        const month = calendarMonth.toString().padStart(2, "0");

        // 공휴일과 포스트 데이터를 동시에 가져오기
        const [holidayResult, postResult] = await Promise.all([
          axiosInstance.get<{ response: { body: { items: { item: Holiday | Holiday[] } } } }>(
            `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`
          ),
          axiosInstance.get<Post[]>(`/api/posts?year=${year}&month=${month}`),
        ]);

        let holidays = holidayResult.data.response?.body?.items?.item || [];
        if (!Array.isArray(holidays)) {
          holidays = [holidays];
        }

        const posts = postResult.data;

        // calendarData 생성 및 설정
        const newCalendarData = setCalendarArray(calendarYear, calendarMonth, holidays, posts);
        setCalendarData(newCalendarData);
      } catch (err) {
        console.error(err);
        setCalendarData([]);
      }
    };

    fetchData();
  }, [calendarYear, calendarMonth]);

  const handleChangeMonth = (increment: number) => {
    const newDate = dayjs(`${calendarYear}-${calendarMonth}-01`).add(increment, "month");
    setCalendarYear(newDate.year());
    setCalendarMonth(newDate.month() + 1);
  };

  return (
    <div className="calendar-page">
      <h1>캘린더 페이지</h1>
      <Calendar
        calendarYear={calendarYear}
        calendarMonth={calendarMonth}
        calendarData={calendarData}
        clickNext={() => handleChangeMonth(1)}
        clickPrev={() => handleChangeMonth(-1)}
      />
    </div>
  );
};

export default CalendarPage;
