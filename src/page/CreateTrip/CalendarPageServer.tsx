import { axiosInstance } from "@/api";
import { Holiday, setCalendarArray } from "@/utils/calendar";
import CalendarClient from "./CalendarClient";

async function getHolidaysAndCalendarData(year: number, month: number) {
  const yearStr = year.toString();
  const monthStr = month.toString().padStart(2, "0");

  try {
    const response = await axiosInstance.get<{ response: { body: { items: { item: Holiday | Holiday[] } } } }>(
      `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${yearStr}&solMonth=${monthStr}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`
    );

    let holidays = response.data.response?.body?.items?.item || [];
    holidays = Array.isArray(holidays) ? holidays : [holidays];

    const posts = []; // 여기에 포스트 데이터를 가져오는 로직을 추가할 수 있습니다.
    const calendarData = setCalendarArray(year, month, holidays, posts);

    return { holidays, calendarData };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return { holidays: [], calendarData: [] };
  }
}

export default async function CalendarPage({ searchParams }: { searchParams: { year?: string; month?: string } }) {
  const currentDate = new Date();
  const year = parseInt(searchParams.year || currentDate.getFullYear().toString());
  const month = parseInt(searchParams.month || (currentDate.getMonth() + 1).toString());

  const { holidays, calendarData } = await getHolidaysAndCalendarData(year, month);

  return <CalendarClient initialYear={year} initialMonth={month} initialCalendarData={calendarData} />;
}
