"use client";
import { useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

const useViewTransition = () => {
  const router = useTransitionRouter();
  // 최근 터치 이벤트 발생 시각을 저장하는 ref
  const lastTouchTimeRef = useRef<number>(0);

  useEffect(() => {
    // 화면 좌측 50px 이내에서 터치가 시작되면 시간 기록
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches[0].clientX < 50) {
        lastTouchTimeRef.current = Date.now();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  useEffect(() => {
    // popstate 이벤트가 발생했을 때, 최근 터치 이벤트와의 시간 차이에 따라 스와이프 여부를 추정
    const handlePopState = () => {
      const now = Date.now();
      const diff = now - lastTouchTimeRef.current;
      // 예를 들어 200ms 이내에 터치가 발생했다면 스와이프 제스처로 판단
      document.documentElement.style.viewTransitionName = "back";

      if (diff < 200) {
        // 이 경우 CSS 클래스를 이용해 view transition 애니메이션을 비활성화하도록 합니다.
        document.documentElement.style.viewTransitionName = "none";
        setTimeout(() => {
          document.documentElement.classList.remove("no-view-transition");
        }, 800);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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
