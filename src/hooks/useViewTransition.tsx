"use client";

import { useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

const useViewTransition = () => {
  const router = useTransitionRouter();
  const swipeDetectedRef = useRef(false);

  useEffect(() => {
    // 터치 시작 시 스와이프 여부 감지
    // const handleTouchStart = (event: TouchEvent) => {
    //   if (event.touches[0].clientX < 50) {
    //     document.documentElement.style.viewTransitionName = "back";
    //   }
    // };

    // // 터치 종료 후 플래그 초기화
    // const handleTouchEnd = () => {
    //   swipeDetectedRef.current = false;
    //   setTimeout(() => {
    //     document.documentElement.removeAttribute("data-swipe-navigation");
    //   }, 300); // 딜레이 후 초기화
    // };

    // popstate 이벤트로 뒤로가기/앞으로 가기 감지
    const handlePopState = () => {
      // swipeDetectedRef.current = true;
      // document.documentElement.setAttribute("data-swipe-navigation", "true");
      // setTimeout(() => {
      //   document.documentElement.removeAttribute("data-swipe-navigation");
      //   swipeDetectedRef.current = false;
      // }, 300);
      document.documentElement.style.viewTransitionName = "back";
    };

    // window.addEventListener("touchstart", handleTouchStart);
    // window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("popstate", handlePopState);

    return () => {
      // window.removeEventListener("touchstart", handleTouchStart);
      // window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateWithTransition = (to: string) => {
    // 스와이프가 감지되었거나 View Transition API가 지원되지 않으면 단순 네비게이션 실행
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    // View Transition API를 사용한 애니메이션 적용
    (document as any).startViewTransition(() => router.push(to));
  };

  return navigateWithTransition;
};

export default useViewTransition;
