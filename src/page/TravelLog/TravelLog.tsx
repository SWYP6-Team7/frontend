"use client";
import AriaFilter from "@/components/travellog/AriaFilter";
import React from "react";

const DUMMY_DATA = [
  { country: "대한민국", recent: "2025-04-13" },
  { country: "인도", recent: "2024-06-20" },
  { country: "아르헨티나", recent: "2024-12-31" },
  { country: "노르웨이", recent: "2024-07-21" },
  { country: "러시아", recent: "2024-09-17" },
  { country: "독일", recent: "2025-03-12" },
  { country: "브라질", recent: "2024-11-22" },
  { country: "멕시코", recent: "2024-06-14" },
  { country: "스웨덴", recent: "2025-04-14" },
  { country: "스페인", recent: "2025-01-31" },
  { country: "캐나다", recent: "2024-11-04" },
  { country: "프랑스", recent: "2024-12-10" },
  { country: "호주", recent: "2024-11-17" },
  { country: "일본", recent: "2024-11-26" },
  { country: "중국", recent: "2024-07-24" },
  { country: "네덜란드", recent: "2024-08-29" },
  { country: "터키", recent: "2025-01-23" },
  { country: "남아프리카공화국", recent: "2024-11-15" },
  { country: "이탈리아", recent: "2024-07-16" },
  { country: "미국", recent: "2024-12-28" },
];

export default function TravelLog() {
  return (
    <>
      <AriaFilter />
    </>
  );
}
