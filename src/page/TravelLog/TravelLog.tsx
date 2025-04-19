"use client";
import { getUserTravelLog } from "@/api/user";
import TravelLogMap from "@/components/map/TravelLogMap";
import AllTravelCount from "@/components/travellog/AllTravelCount";
import AriaDropdown from "@/components/travellog/AriaDropdown";
import AriaFilter from "@/components/travellog/AriaFilter";
import { authStore } from "@/store/client/authStore";
import { groupRegionData } from "@/utils/travellog/travelLog";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TravelLog() {
  const searchParams = useSearchParams();
  const filter = (searchParams.get("filter") ?? "세계") as "국내" | "세계";
  const { userNumber } = useParams();
  const { accessToken, isGuestUser } = authStore();
  console.log(filter);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userTravelLog", userNumber],
    queryFn: () => getUserTravelLog(Number(userNumber)!, accessToken),
    enabled: !!userNumber && (isGuestUser || !!accessToken),
  });
  console.log("data", data);
  const logs: any = filter === "세계" ? data?.internationalLogs : groupRegionData(data?.domesticLogs, "국내");
  const [target, setTarget] = useState<string[] | null>(null);

  useEffect(() => {
    if (logs) {
      setTarget([Object.keys(logs)[0]]);
    }
  }, [JSON.stringify(logs)]);

  if (isError) {
    return null;
  }
  return !isLoading ? (
    <div style={{ marginBottom: 80 }}>
      <AriaFilter />
      {logs && (
        <TravelLogMap
          target={target ? target[target.length - 1] : null}
          highlightedRegions={Object.values(logs).flatMap((item: any) => {
            return item.map((item) => item.countryName ?? item.locationName);
          })}
          type={filter}
        />
      )}
      {data && Boolean(data?.visitedCountriesCount > 0) && <AllTravelCount count={data.visitedCountriesCount} />}
      {logs && <AriaDropdown setTarget={setTarget} data={logs} />}
    </div>
  ) : (
    <></>
  );
}
