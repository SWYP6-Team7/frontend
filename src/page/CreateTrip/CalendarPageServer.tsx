import { axiosInstance } from "@/api";
import { Holiday, setCalendarArray } from "@/utils/calendar";
import CalendarClient from "./CalendarClient";

async function getHolidays(year: number, month: number) {
  const yearStr = year.toString();
  const monthStr = month.toString().padStart(2, "0");

  try {
    const response = await axiosInstance.get<{ response: { body: { items: { item: Holiday | Holiday[] } } } }>(
      `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${yearStr}&solMonth=${monthStr}&ServiceKey=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`
    );

    let holidays = response.data.response?.body?.items?.item || [];
    return Array.isArray(holidays) ? holidays : [holidays];
  } catch (error) {
    console.error("Failed to fetch holidays:", error);
    return [];
  }
}

export default async function CalendarPage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const holidaysArray: any[] = [];

  for (let i = 0; i < 6; i++) {
    let year = currentYear;
    let month = currentMonth + i;

    if (month > 12) {
      month -= 12;
      year += 1;
    }

    //  const holidays = await getHolidays(year, month);
    holidaysArray.push({ year, month, holidays: [] });
  }
  // console.log(holidaysArray, "holidays");

  return <CalendarClient holidaysArray={holidaysArray} />;
}
