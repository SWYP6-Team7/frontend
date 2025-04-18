"use client";
import { SpotType } from "@/model/trip";
import { getCurrentFormattedDate } from "@/utils/time";
import { create } from "zustand";

interface EditTripStore {
  locationName: {
    locationName: string;
    mapType: "google" | "kakao";
    countryName: string;
  };
  addLocationName: ({
    locationName,
    mapType,
    countryName,
  }: {
    locationName: string;
    mapType: "google" | "kakao";
    countryName: string;
  }) => void;
  title: string;
  addTitle: (title: string) => void;
  details: string;
  addDetails: (details: string) => void;
  maxPerson: number;
  addMaxPerson: (maxPerson: number) => void;
  genderType: string | null;
  addGenderType: (genderType: string) => void;
  dueDate: string;
  addDueDate: (dueDate: string) => void;
  date: { startDate: string; endDate: string } | null;
  addDate: ({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) => void;
  periodType: string;
  addPeriodType: (periodType: string) => void;
  tags: string[];
  addTags: (tags: string[]) => void;
  initGeometry: { lng: number; lat: number } | null;
  addInitGeometry: (obj: { lat: number; lng: number } | null) => void;
  completionStatus: boolean;
  originalPlans: {
    date?: string;
    id?: string | number;
    planOrder: number;
    spots: SpotType[];
  }[];
  setOriginalPlans: (
    plans: {
      date?: string;
      id?: string | number;
      planOrder: number;
      spots: SpotType[];
    }[]
  ) => void;

  plans: {
    date?: string;
    id?: string | number;
    planOrder: number;
    spots: SpotType[];
  }[];
  dataInitialized: boolean;
  setDataInitialized: (bool: boolean) => void;
  addPlans: (plans: { planOrder: number; spots: SpotType[] }[]) => void;
  addCompletionStatus: (completionStatus: boolean) => void;
  resetEditTripDetail: () => void;
}

export const editTripStore = create<EditTripStore>((set) => ({
  title: "",
  addTitle: (title) => {
    set({ title });
  },
  dataInitialized: false,
  setDataInitialized: (dataInitialized) => {
    set({ dataInitialized });
  },
  locationName: { locationName: "", mapType: "google", countryName: "" },
  addLocationName: (locationName) => {
    set({ locationName });
  },
  details: "",
  addDetails: (details) => {
    set({ details });
  },
  maxPerson: 1,
  addMaxPerson: (maxPerson) => {
    set({ maxPerson });
  },
  initGeometry: null,
  addInitGeometry: (geo) => {
    set({ initGeometry: geo });
  },
  genderType: null,
  addGenderType: (genderType) => {
    set({ genderType });
  },
  dueDate: getCurrentFormattedDate().split(" ")[0], // 혹시 유저가 마감일 지정일을 따로 설정안하고 당일로 한다면, 오늘 날짜로 들어가도록.
  addDueDate: (dueDate) => {
    const [year, month, day] = dueDate.split("-");
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    set({ dueDate: `${year}-${formattedMonth}-${formattedDay}` });
  },
  date: null,
  addDate: (date) => {
    set({ date });
  },
  periodType: "",
  addPeriodType: (periodType) => {
    set({ periodType });
  },
  plans: [],
  addPlans: (plans) => {
    set({ plans });
  },
  originalPlans: [],
  setOriginalPlans: (originalPlans) => {
    set({ originalPlans });
  },
  tags: [],
  addTags: (tags) => {
    set({ tags });
  },
  completionStatus: true,
  addCompletionStatus: (completionStatus) => {
    set({ completionStatus });
  },

  resetEditTripDetail: () => {
    set({
      title: "",
      locationName: {
        countryName: "",
        locationName: "",
        mapType: "google",
      },
      details: "",
      maxPerson: 1,
      genderType: "",
      dueDate: getCurrentFormattedDate().split(" ")[0],
      periodType: "",
      tags: [],
      plans: [],
      originalPlans: [],
      dataInitialized: false,
      completionStatus: false,
    });
  },
}));
