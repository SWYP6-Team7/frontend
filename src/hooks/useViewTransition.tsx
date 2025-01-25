"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useViewTransition = () => {
  const router = useRouter();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (isPageReady && (document as any).startViewTransition) {
      (document as any).startViewTransition(() => {});
      setIsPageReady(false);
    }
  }, [isPageReady]);

  const navigateWithTransition = (to: string) => {
    router.push(to);

    // 다음 페이지 로딩 완료 시점에 애니메이션 트리거
    setTimeout(() => {
      setIsPageReady(true);
    }, 0);
  };

  return navigateWithTransition;
};

export default useViewTransition;
