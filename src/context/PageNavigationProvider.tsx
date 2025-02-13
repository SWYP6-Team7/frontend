"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const PageNavigationProvider = ({ children }: React.PropsWithChildren) => {
  const lastTouchTimeRef = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const router = useRouter();

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      touchStartX.current = event.touches[0].clientX;
      if (touchStartX.current < 50) {
        lastTouchTimeRef.current = Date.now();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX.current = event.changedTouches[0].clientX;
      const swipeDistance = touchStartX.current - touchEndX.current;

      if (swipeDistance > 50 && touchStartX.current < 50) {
        event.preventDefault();
        document.documentElement.style.viewTransitionName = "none";
      }
    };

    const handlePopState = () => {
      const now = Date.now();
      const diff = now - lastTouchTimeRef.current;

      if (diff < 800) {
        document.startViewTransition(() => {
          document.documentElement.style.viewTransitionName = "none";
        });
      } else {
        document.startViewTransition(() => {
          document.documentElement.style.viewTransitionName = "back";
        });
      }

      setTimeout(() => {
        lastTouchTimeRef.current = 0;
      }, 500);
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    const prefetchPreviousPage = () => {
      const currentPath = window.location.pathname;
      const segments = currentPath.split("/");
      if (segments.length > 1) {
        const previousPath = segments.slice(0, -1).join("/") || "/";
        router.prefetch(previousPath);
      }
    };

    prefetchPreviousPage();
  }, [router]);

  return <>{children}</>;
};

export default PageNavigationProvider;
