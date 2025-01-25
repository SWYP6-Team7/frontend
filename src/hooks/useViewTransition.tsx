"use client";
import { useRouter } from "next/navigation";

const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (to: string) => {
    if (!(document as any).startViewTransition) {
      // startViewTransition 미지원 브라우저 대응
      router.push(to);
      return;
    }

    // startViewTransition 지원 브라우저
    (document as any).startViewTransition(() => {
      // 다음 프레임에서 DOM 업데이트 보장
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(router.push(to)); // DOM이 안정된 후에 라우팅
        });
      });
    });
  };

  return navigateWithTransition;
};

export default useViewTransition;
