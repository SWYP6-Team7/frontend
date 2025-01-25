"use client";
import { useRouter } from "next/navigation";

const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (to: string) => {
    const startTransition = (callback: () => void) => {
      if ((document as any).startViewTransition) {
        (document as any).startViewTransition(callback);
      } else {
        callback();
      }
    };

    startTransition(() => {
      setTimeout(() => {
        router.push(to);
      }, 0); // 브라우저에서 Transition API와 라우팅의 타이밍을 맞추기 위한 지연 처리
    });
  };

  return navigateWithTransition;
};

export default useViewTransition;
