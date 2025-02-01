import { ISearchData } from "@/model/search";
import { axiosInstance } from ".";
import { Filters } from "@/hooks/search/useSearch";
import { getJWTHeader } from "@/utils/user";
import dayjs from "dayjs";
import RequestError from "@/context/ReqeustError";

export async function getSearch(
  pageParams: number,
  keyword: string,
  filters: Filters,
  accessToken: string | null
) {
  const { tags, period, person, gender, location, sorting } = filters;
  try {
    const response = await axiosInstance.get("/api/travels/search", {
      params: {
        keyword: keyword,
        page: pageParams,
        sorting,
        tags: tags.join(","),
        period: period.join(","),
        person: person.join(","),
        gender: gender.join(","),
        location: location.join(","),
      },
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    let data = response.data as ISearchData | undefined;

    return response.data;
  } catch (err: any) {
    throw new RequestError(err);
  }
}

export async function getSearchRelation(
  keyword: string,
  accessToken: string | null
) {
  try {
    const response = await axiosInstance.get("/api/autocomplete", {
      params: {
        location: keyword,
      },
      ...(accessToken && { headers: getJWTHeader(accessToken) }),
    });
    return response.data as { suggestions: string[] };
  } catch (err: any) {
    throw new RequestError(err);
  }
}
