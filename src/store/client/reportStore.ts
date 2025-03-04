"use client";
import { create } from "zustand";

interface IReportStore {
  reportSuccess: boolean;
  setReportSuccess: (bool: boolean) => void;
  detailId: null | number;
  setDetailId: (detailId: number | null) => void;
}

export const reportStore = create<IReportStore>((set) => ({
  reportSuccess: false,
  setReportSuccess: (bool) => {
    set({ reportSuccess: bool });
  },
  detailId: null,
  setDetailId: (detailId) => {
    set({ detailId });
  },
}));
