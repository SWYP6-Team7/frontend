"use client";
import { create } from "zustand";

interface ITripPlanStore {
  scrollTop: number;
  addScrollTop: (num: number) => void;
  planIndex: number;
  addPlanIndex: (num: number) => void;
}

export const tripPlanStore = create<ITripPlanStore>((set) => ({
  scrollTop: 0,
  addScrollTop: (scrollTop) => {
    set({ scrollTop });
  },
  planIndex: 0,
  addPlanIndex: (planIndex) => {
    set({ planIndex });
  },
}));
