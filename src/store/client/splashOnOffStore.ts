"use client";
import { create } from "zustand";

interface splashState {
  splashOn: boolean;
  addSplashOn: (value: boolean) => void;
}
// 앱 실행처럼 탭이 닫히고 다시 접속한다면, 그 때 마다 스플래쉬 화면 보여줌.
export const splashOnStore = create<splashState>((set) => ({
  splashOn: typeof window !== "undefined" ? (sessionStorage.getItem("revisit") ? false : true) : false,
  addSplashOn: (value) => {
    set((state) => ({ splashOn: value }));
  },
}));
