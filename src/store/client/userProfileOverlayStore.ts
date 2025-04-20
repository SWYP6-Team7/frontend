"use client";
import { create } from "zustand";

interface IUserProfileOverlayStore {
  profileShow: boolean;
  setProfileShow: (bool: boolean) => void;
  userProfileUserId: number;
  setUserProfileUserId: (id: number) => void;
}

export const userProfileOverlayStore = create<IUserProfileOverlayStore>((set) => ({
  profileShow: false,
  setProfileShow: (bool) => {
    set({ profileShow: bool });
  },
  userProfileUserId: -1,
  setUserProfileUserId: (id) => {
    set({ userProfileUserId: id });
  },
}));
