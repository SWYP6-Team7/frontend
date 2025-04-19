import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ userNumber: string }> }) {
  const { userNumber } = await params;

  return NextResponse.json({
    resultType: "SUCCESS",
    success: {
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
    },
  });
}
