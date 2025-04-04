"use client";
import { useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

const useViewTransition = () => {
  const router = useTransitionRouter();
  // 최근 터치 이벤트 발생 시각을 저장하는 ref

  const navigateWithTransition = (to: string) => {
    // View Transition API를 지원하지 않으면 단순 네비게이션
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    // 그렇지 않은 경우에만 view transition 애니메이션 적용
    (document as any).startViewTransition(() => router.push(to));
  };

  return navigateWithTransition;
};

export default useViewTransition;
