"use client";
import { create } from "zustand";

export type IPlace = "국내" | "해외";
export type IPeriod = "일주일 이하" | "1~2주" | "3~4주" | "한달 이상";
export type IPeople = "2명" | "3~4명" | "5명 이상";
export type IStyle =
  | "힐링"
  | "즉흥적"
  | "계획적인"
  | "액티비티"
  | "먹방"
  | "예술"
  | "핫플"
  | "쇼핑"
  | "가성비"
  | "역사"
  | "자연";
export type IGender = "모두" | "여자만" | "남자만";

interface ISearchStore {
  sort: "추천순" | "최신순" | "등록일순";
  keyword: string;
  setKeyword: (keyword: string) => void;
  setSort: (sort: "추천순" | "최신순" | "등록일순") => void;
  place: IPlace[];
  people: IPeople[];
  period: IPeriod[];
  style: IStyle[];
  gender: IGender[];
  setFilter: (
    type: "장소" | "인원" | "기간" | "스타일" | "성별",
    value: IPeople[] | IPeriod[] | IStyle[] | IPlace[] | IGender[]
  ) => void;
  setReset: () => void;
  setOneFilterReset: (
    type: "장소" | "인원" | "기간" | "스타일" | "성별"
  ) => void;
}

// userId와 accessToken을 전역 상태로 관리하는 역할
export const searchStore = create<ISearchStore>((set, get) => ({
  sort: "최신순" as "최신순",
  keyword: "",
  place: [],
  period: [],
  people: [],
  style: [],
  gender: [],
  setKeyword: (keyword) => {
    set({ keyword });
  },
  setSort: (sort) => {
    set({ sort });
  },
  setFilter: (type, value) => {
    const currentFilters = get();

    if (type === "장소") {
      const updatedPlace = toggleFilter(
        currentFilters.place,
        value as IPlace[]
      );
      set({ place: updatedPlace });
    } else if (type === "인원") {
      const updatedPeople = toggleFilter(
        currentFilters.people,
        value as IPeople[]
      );
      set({ people: updatedPeople });
    } else if (type === "기간") {
      const updatedPeriod = toggleFilter(
        currentFilters.period,
        value as IPeriod[]
      );
      set({ period: updatedPeriod });
    } else if (type === "스타일") {
      const updatedStyle = toggleFilter(
        currentFilters.style,
        value as IStyle[]
      );
      set({ style: updatedStyle });
    } else if (type === "성별") {
      const updatedGender = toggleFilter(
        currentFilters.gender,
        value as IGender[]
      );
      set({ gender: updatedGender });
    }
  },
  setReset: () => {
    set({ people: [], period: [], style: [], place: [] });
  },
  setOneFilterReset: (type) => {
    if (type === "장소") {
      set({ place: [] });
    } else if (type === "인원") {
      set({ people: [] });
    } else if (type === "기간") {
      set({ period: [] });
    } else if (type === "스타일") {
      set({ style: [] });
    } else if (type === "성별") {
      set({ gender: [] });
    }
  },
}));

function toggleFilter<T>(currentFilters: T[] = [], value: T[]): T[] {
  return currentFilters.includes(value[0])
    ? currentFilters.filter((v) => v !== value[0])
    : [...currentFilters, value[0]];
}
