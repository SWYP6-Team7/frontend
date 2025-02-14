"use client";
import { create } from "zustand";

interface IReportStore {
  reportSuccess: boolean;
  setReportSuccess: (bool: boolean) => void;
}

export const reportStore = create<IReportStore>((set) => ({
  reportSuccess: false,
  setReportSuccess: (bool) => {
    set({ reportSuccess: bool });
  },
}));
