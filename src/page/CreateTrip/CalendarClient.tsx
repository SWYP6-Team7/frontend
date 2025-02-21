"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Calendar from "@/components/calendar/CalendarView";
import { CalendarDay } from "@/utils/calendar";

interface CalendarClientProps {
  initialYear: number;
  initialMonth: number;
  initialCalendarData: CalendarDay[][];
}

const CalendarClient: React.FC<CalendarClientProps> = ({ initialYear, initialMonth, initialCalendarData }) => {
  const router = useRouter();

  const handleChangeMonth = (increment: number) => {
    let newYear = initialYear;
    let newMonth = initialMonth + increment;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    router.push(`/test/createTripIntroduce?year=${newYear}&month=${newMonth}`);
  };

  return (
    <div className="calendar-page">
      <h1>캘린더 페이지</h1>
      <Calendar
        calendarYear={initialYear}
        calendarMonth={initialMonth}
        calendarData={initialCalendarData}
        clickNext={() => handleChangeMonth(1)}
        clickPrev={() => handleChangeMonth(-1)}
      />
    </div>
  );
};

export default CalendarClient;
