"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = useCallback(
    (to: string) => {
      if (!(document as any).startViewTransition) {
        router.push(to);
        return;
      }

      (document as any)
        .startViewTransition(() => {
          router.push(to);
        })
        .finished.then(() => {
          // 애니메이션 완료 후 추가 처리 가능
          (document as any).documentElement.style.viewTransitionName = "";
        });
    },
    [router]
  );

  return navigateWithTransition;
};

export default useViewTransition;
