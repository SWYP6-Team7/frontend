"use client";
import { useRouter } from "next/navigation";
const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (to: string) => {
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    // 페이지 전환을 먼저 트리거
    router.push(to);

    // 애니메이션은 다음 렌더링 사이클에서 시작
    (document as any).startViewTransition(() => {});
  };

  return navigateWithTransition;
};

export default useViewTransition;
