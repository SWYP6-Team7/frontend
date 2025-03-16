"use client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ko";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

dayjs.locale("ko");
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(utc);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s 전",
    s: "지금",
    m: "1분 ",
    mm: "%d분 ",
    h: "1시간 ",
    hh: "%d시간 ",
    d: "어제",
    dd: "%d일 ",
    M: "1달",
    MM: "%d달 ",
    y: "1년 ",
    yy: "%d년 ",
  },
});

export function formatTime(date: string) {
  const now = dayjs().utcOffset(9);
  const inputDate = dayjs.utc(date).utcOffset(9); // locale utc 변환해보기

  const diffInMinutes = now.diff(inputDate, "minute");
  const diffInHours = now.diff(inputDate, "hour");
  const diffInDays = now.diff(inputDate, "day");

  if (diffInMinutes < 60) {
    return inputDate.fromNow();
  } else if (diffInHours < 24) {
    return inputDate.fromNow();
  } else if (diffInDays === 1) {
    return "어제";
  } else {
    return inputDate.fromNow();
  }
}

export function getDateRangeCategory(startDate, endDate) {
  const start = dayjs(startDate, "YYYY-MM-DD");
  const end = dayjs(endDate, "YYYY-MM-DD");

  const deltaDays = end.diff(start, "day");

  if (deltaDays < 0) {
    throw new Error("startDate는 endDate보다 이전이어야 합니다.");
  }

  // 기간에 따른 카테고리 분류
  if (deltaDays <= 7) {
    return "일주일 이하";
  } else if (deltaDays <= 14) {
    return "1~2주";
  } else if (deltaDays <= 28) {
    return "3~4주";
  } else {
    return "한 달 이상";
  }
}

export function getDateByPlanOrder(startDate, planOrder) {
  if (typeof planOrder !== "number" || planOrder < 1) {
    throw new Error("planOrder는 1 이상의 숫자여야 합니다.");
  }

  // startDate를 dayjs 객체로 변환
  const start = dayjs(startDate, "YYYY-MM-DD");

  // planOrder에 따라 날짜 계산 (planOrder가 1이면 startDate 그대로 반환)
  const calculatedDate = start.add(planOrder - 1, "day");

  // 계산된 날짜를 "YYYY-MM-DD" 형식으로 반환
  return calculatedDate.format("YYYY-MM-DD");
}
export function formatTimeOnContact(date: string) {
  const now = dayjs().utcOffset(9);
  const inputDate = dayjs.utc(date).utcOffset(9);
  console.log("inputDate", inputDate.format(), now.format());
  const diffInMinutes = now.diff(inputDate, "minute");
  const diffInHours = now.diff(inputDate, "hour");
  const diffInDays = now.diff(inputDate, "day");

  if (diffInMinutes < 60) {
    return inputDate.fromNow();
  } else if (diffInHours < 24) {
    return inputDate.fromNow();
  } else if (diffInDays === 1) {
    return "어제";
  } else if (diffInDays < 2) {
    return inputDate.fromNow();
  } else {
    return inputDate.format("YYYY.MM.DD");
  }
}

export function daysLeft(dateString: string) {
  const today = dayjs().utcOffset(9).toDate();
  const targetDate = dayjs.utc(dateString).utcOffset(9).toDate();
  const timeDifference = targetDate.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export function daysAgo(date: string) {
  const now = dayjs().utcOffset(9);
  const inputDate = dayjs.utc(date).utcOffset(9);

  const diffInMinutes = now.diff(inputDate, "minute");
  const diffInHours = now.diff(inputDate, "hour");
  const diffInDays = now.diff(inputDate, "day");

  if (diffInMinutes < 10) {
    return "지금";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays === 1) {
    return "어제";
  } else {
    return `${diffInDays}일 전`;
  }
}

export function daysAgoFormatted(date: string) {
  console.log(date, "date");
  const format = "YYYY년 MM월 DD일 HH시 mm분";
  const parsedDate = dayjs(date, format);
  console.log("parse", parsedDate);
  return daysAgo(parsedDate.format("YYYY-MM-DD HH:mm"));
}
// 현재 시간을 2000-10-10 11:11 문자열로 반환.
export function getCurrentFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 참가 신청 목록을 조회한 최근 시간을 기록하는데 필요한 시간 변환 함수.
//현재 시간을 2000.10.10 11:11 문자열로 반환.
export function todayFormattedDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 새로 들어온 신청인지 확인하는 함수
export const isNewApply = (last: string, enrolledTime: string) => {
  // 문자열을 Date 객체로 변환
  const lastTime = new Date(last.replace(".", "-").replace(".", "-"));
  const enrolledAt = new Date(enrolledTime.replace(".", "-").replace(".", "-"));

  // 주어진 날짜가 현재 시간보다 이전인지 확인
  return lastTime < enrolledAt;
};
