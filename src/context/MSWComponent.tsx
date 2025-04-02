"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        // NEXT_PUBLIC_API_MOCKING 환경 변수가 enabled일 때 MSW 실행
        require("@/mocks/browser");
      }
    }
  }, []);

  return null;
};
