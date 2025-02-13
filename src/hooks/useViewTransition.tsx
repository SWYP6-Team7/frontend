"use client";
import { useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

const useViewTransition = () => {
  const router = useTransitionRouter();
  const swipeDetectedRef = useRef(false);

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches[0].clientX < 50) {
        swipeDetectedRef.current = true;
      }
    };

    const handleTouchEnd = () => {
      swipeDetectedRef.current = false;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const navigateWithTransition = (to: string) => {
    // 스와이프가 감지되었거나 View Transition API 지원이 없으면 단순 네비게이션 실행
    if (swipeDetectedRef.current || !(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    (document as any).startViewTransition(() => router.push(to));
  };

  return navigateWithTransition;
};

export default useViewTransition;
