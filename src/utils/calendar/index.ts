import dayjs from "dayjs";

export interface Holiday {
  locdate: string;
  dateName: string;
}

export interface Post {
  calendarId: string;
  startTime: string;
  endTime: string;

  index?: number;
  multiple: boolean;
  start: boolean;
  username?: string;
  content?: string;
}

export interface CalendarDay {
  date: number;
  dayFormat?: string;
  type: "prev" | "now" | "next";
  posts?: Post[];
  holiday?: Holiday;
}

export const setCalendarArray = (
  year: number,
  month: number,
  holidays?: Holiday[],
  posts?: Post[]
): CalendarDay[][] => {
  const monthArray: CalendarDay[][] = [];
  let weekArray: CalendarDay[] = [];

  const prevLastDate = new Date(year, month - 1, 0).getDate();
  const prevLastDay = new Date(year, month - 1, 0).getDay();
  const nextDate = new Date(year, month, 0).getDate();

  // 이전 달의 날짜 추가
  for (let i = prevLastDay; i >= 0; i--) {
    weekArray.unshift({ date: prevLastDate - i, type: "prev" });
  }

  // 포스트 인덱스 관리를 위한 맵
  const postIndexMap = new Map<string, number>();

  // 현재 달의 날짜 추가
  for (let i = 1; i <= nextDate; i++) {
    const dayFormat = `${year}${month.toString().padStart(2, "0")}${i.toString().padStart(2, "0")}`;
    const dayPosts =
      posts?.filter(
        (post) =>
          dayjs(post.startTime).format("YYYYMMDD") <= dayFormat && dayFormat <= dayjs(post.endTime).format("YYYYMMDD")
      ) || [];

    const sortedPosts = dayPosts.sort((a, b) => {
      const aStartDate = dayjs(a.startTime);
      const bStartDate = dayjs(b.startTime);
      if (aStartDate.isSame(bStartDate)) {
        return dayjs(b.endTime).diff(bStartDate) - dayjs(a.endTime).diff(aStartDate);
      }
      return aStartDate.isBefore(bStartDate) ? -1 : 1;
    });

    const mappedPosts = sortedPosts
      .map((post) => {
        const isStart = dayFormat === dayjs(post.startTime).format("YYYYMMDD");
        const isMultiple = dayjs(post.startTime).format("YYYYMMDD") !== dayjs(post.endTime).format("YYYYMMDD");

        let index = postIndexMap.get(post.calendarId);
        if (isStart && index === undefined) {
          index = Array.from(postIndexMap.values()).indexOf(-1) + 1;
          if (index > 0 && index <= 3) {
            postIndexMap.set(post.calendarId, index);
          }
        }

        return {
          ...post,
          start: isStart,
          multiple: isMultiple,
          index: index,
        };
      })
      .filter((post) => post.index !== undefined);

    const day: CalendarDay = {
      date: i,
      dayFormat,
      type: "now",
      posts: mappedPosts,
    };

    if (holidays) {
      const holiday = holidays.find((h) => h.locdate === dayFormat);
      if (holiday) {
        day.holiday = holiday;
      }
    }

    weekArray.push(day);

    if (weekArray.length === 7) {
      monthArray.push(weekArray);
      weekArray = [];
    }
  }

  // 다음 달의 날짜 추가
  const remainingDays = 7 - weekArray.length;
  for (let i = 1; i <= remainingDays; i++) {
    weekArray.push({ date: i, type: "next" });
  }

  if (weekArray.length > 0) {
    monthArray.push(weekArray);
  }

  return monthArray;
};
