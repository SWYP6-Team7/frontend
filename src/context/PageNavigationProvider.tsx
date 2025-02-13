"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const PageNavigationProvider = ({ children }: React.PropsWithChildren) => {
  const lastTouchTimeRef = useRef<number>(0);
  const router = useRouter();

  useEffect(() => {
    // 화면 좌측 50px 이내에서 터치가 시작되면 시간 기록
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches[0].clientX < 50) {
        event.preventDefault();

        console.log("touch");
        lastTouchTimeRef.current = Date.now();
        document.documentElement.style.viewTransitionName = "none";
      }
    };

    // const handleTouchEnd = (event: TouchEvent) => {
    //   setTimeout(() => {
    //     document.body.classList.remove("body-fade");
    //   }, 500);
    // };

    window.addEventListener("touchstart", handleTouchStart);
    //window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      //   window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // useEffect(() => {
  //   const handlePagehide = () => {
  //     document.body.style.opacity = "0";
  //   };
  //   window.addEventListener("pagehide", handlePagehide);
  //   return () => {
  //     window.removeEventListener("pagehide", handlePagehide);
  //   };
  // }, []);

  useEffect(() => {
    // popstate 이벤트가 발생했을 때, 최근 터치 이벤트와의 시간 차이에 따라 스와이프 여부를 추정
    const handlePopState = () => {
      const now = Date.now();
      const diff = now - lastTouchTimeRef.current;
      // 예를 들어 200ms 이내에 터치가 발생했다면 스와이프 제스처로 판단
      document.documentElement.style.viewTransitionName = "back";
      console.log("popstate");
      if (diff < 800) {
        // 이 경우 CSS 클래스를 이용해 view transition 애니메이션을 비활성화하도록 합니다.
        document.documentElement.style.viewTransitionName = "none";

        setTimeout(() => {
          lastTouchTimeRef.current = 0;
        }, 500);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return <>{children}</>;
};

export default PageNavigationProvider;
