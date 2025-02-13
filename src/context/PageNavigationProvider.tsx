"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

const PageNavigationProvider = ({ children }: React.PropsWithChildren) => {
  const lastTouchTimeRef = useRef<number>(0);
  const alternator = useRef<number>(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isIOS = () => {
    if (typeof window === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any)?.MSStream;
  };

  // useLayoutEffect를 사용하여 라우트 변경 시 스크롤 업데이트를 페인트 전에 처리합니다.
  useLayoutEffect(() => {
    const slightScroll = () => {
      if (isIOS()) {
        window.scrollTo({ left: 0, top: alternator.current });
        alternator.current = Number(!alternator.current);
      }
    };
    slightScroll();
  }, [pathname, searchParams]);

  useEffect(() => {
    // 화면 좌측 50px 이내에서 터치가 시작되면 시간 기록
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches[0].clientX < 50) {
        lastTouchTimeRef.current = Date.now();
        event.preventDefault();
        document.documentElement.style.viewTransitionName = "none";
      }
    };

    // const handleTouchEnd = (event: TouchEvent) => {
    //   if (event.touches[0].clientX < 50) {
    //     lastTouchTimeRef.current = Date.now();
    //     event.preventDefault();
    //     document.documentElement.style.viewTransitionName = "none";
    //   }
    // };

    //window.addEventListener("touchend", handleTouchEnd);

    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      //window.removeEventListener("touchend", handleTouchEnd);
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
