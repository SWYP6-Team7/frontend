"use client";
import { create } from "zustand";

// Zustand 스토어 생성
interface BookmarkStore {
  bookmarkStore: Set<number>; // Set 자료형 사용
  addBookmarkStore: (travelNumber: number) => void;
  isBookmarked: (travelNumber: number) => boolean; // 숫자가 Set에 포함되어 있는지 확인하는 함수
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarkStore: new Set<number>(), // Set으로 초기화
  addBookmarkStore: (travelNumber) => {
    const currentBookmarks = new Set(get().bookmarkStore);
    currentBookmarks.add(travelNumber);
    set({ bookmarkStore: currentBookmarks });
  },
  isBookmarked: (travelNumber) => {
    return get().bookmarkStore.has(travelNumber);
  },
}));
