"use client";
import { create } from "zustand";

interface RelationKeywordProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const releationKeywordStore = create<RelationKeywordProps>((set) => ({
  show: false,
  setShow: (show) => {
    set({ show });
  },
}));
