"use client";
import { create } from "zustand";

interface IBackPathStore {
  searchTravel: "/" | "/trip/list";
  setSearchTravel: (searchTravel: "/" | "/trip/list") => void;
  notification: string;
  setNotification: (path: string) => void;
  createTripPlace: "/" | "/trip/list";
  setCreateTripPlace: (path: "/" | "/trip/list") => void;
  travelDetail: string;
  setTravelDetail: (path: string) => void;
  login: string;
  setLogin: (path?: undefined | string) => void;
}

export const useBackPathStore = create<IBackPathStore>((set) => ({
  searchTravel: "/",
  setSearchTravel: (searchTravel) => {
    set({ searchTravel });
  },
  notification: "/",
  setNotification: (path) => {
    set({ notification: path });
  },
  createTripPlace: "/",
  setCreateTripPlace: (path) => {
    set({ createTripPlace: path });
  },
  travelDetail: "/trip/list",
  setTravelDetail: (path) => {
    set({ travelDetail: path });
  },
  login: "/",
  setLogin: (path) => {
    const pathname = window.location.pathname;
    set({ login: path ? path : pathname });
  },
}));
