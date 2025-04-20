"use client";
import { create } from "zustand";

interface ITripPlanStore {
  scrollTop: number;
  addScrollTop: (num: number) => void;
  planIndex: number;
  addPlanIndex: (num: number) => void;
  isChange: boolean;
  addIsChange: (bool: boolean) => void;
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
  isChange: false,
  addIsChange: (isChange) => {
    set({ isChange });
  },
}));
