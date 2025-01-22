"use client";
import { create } from "zustand";

interface IAuthStore {
  userId: number | null;
  accessToken: string | null;
  setLoginData: ({ userId, accessToken }: { userId: number; accessToken: string }) => void;
  clearLoginData: () => void;
  logoutCheck: boolean;
  addLogoutCheck: (logoutCheck: boolean) => void;
  resetData: () => void;
  isGuestUser: boolean;
  setIsGuestUser: (isGuestUser: boolean) => void;
}

// userId와 accessToken을 전역 상태로 관리하는 역할
export const authStore = create<IAuthStore>((set) => ({
  userId: null,
  isGuestUser: false,
  accessToken: null,
  setLoginData: ({ userId, accessToken }) => {
    set((state) => ({ userId, accessToken, isGuestUser: false }));
  },
  clearLoginData: () => {
    set((state) => ({ userId: null, accessToken: null, isGuestUser: true }));
  },
  setIsGuestUser: (isGuestUser) => {
    set({ isGuestUser });
  },
  logoutCheck: false,
  addLogoutCheck: (state) => {
    set({ logoutCheck: state });
  },
  resetData: () => {
    set({ userId: null, accessToken: null, isGuestUser: true });
  },
}));
