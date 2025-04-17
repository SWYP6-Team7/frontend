"use client";
import TravelLogMap from "@/components/map/TravelLogMap";
import AllTravelCount from "@/components/travellog/AllTravelCount";
import AriaDropdown from "@/components/travellog/AriaDropdown";
import AriaFilter from "@/components/travellog/AriaFilter";
import { groupRegionData } from "@/utils/travellog/travelLog";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const DUMMY_DATA = {
  userNumber: 3,
  visitedCountriesCount: 8,
  internationalLogs: {
    ASIA: [
      {
        countryName: "일본",
        visitDates: ["2025-02-22", "2025-03-22", "2025-04-09"],
      },
      {
        countryName: "태국",
        visitDates: ["2025-03-22"],
      },
      {
        countryName: "베트남",
        visitDates: ["2024-12-15"],
      },
    ],
    NORTH_AMERICA: [
      {
        countryName: "캐나다",
        visitDates: ["2025-03-22"],
      },
      {
        countryName: "미국",
        visitDates: ["2025-03-22"],
      },
    ],
    EUROPE: [
      {
        countryName: "프랑스",
        visitDates: ["2025-03-22"],
      },
      {
        countryName: "영국",
        visitDates: ["2025-03-22"],
      },
    ],
    OCEANIA: [
      {
        countryName: "호주",
        visitDates: ["2024-10-10"],
      },
    ],
  },
  domesticLogs: [
    {
      locationName: "부산",
      visitDates: ["2025-04-09"],
    },
    {
      locationName: "경주",
      visitDates: ["2025-04-09"],
    },
    {
      locationName: "서울",
      visitDates: ["2025-03-15", "2025-04-01"],
    },
  ],
};
export default function TravelLog() {
  const searchParams = useSearchParams();
  const filter = (searchParams.get("filter") ?? "세계") as "국내" | "세계";
  console.log(filter);
  const data = DUMMY_DATA;
  const logs: any = filter === "세계" ? data.internationalLogs : groupRegionData(data.domesticLogs, "국내");
  const [target, setTarget] = useState<string[] | null>(null);
  console.log("target", target);
  useEffect(() => {
    setTarget([Object.keys(logs)[0]]);
  }, [JSON.stringify(logs)]);
  console.log(logs, Object.values(logs));
  return (
    <div style={{ marginBottom: 80 }}>
      <AriaFilter />
      <TravelLogMap
        target={target ? target[target.length - 1] : null}
        highlightedRegions={Object.values(logs).flatMap((item: any) => {
          return item.map((item) => item.countryName ?? item.locationName);
        })}
        type={filter}
      />
      {data.visitedCountriesCount > 0 && <AllTravelCount count={data.visitedCountriesCount} />}
      {logs && <AriaDropdown setTarget={setTarget} data={logs} />}
    </div>
  );
}
