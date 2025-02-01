"use client";
import { useRouter } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

const useViewTransition = () => {
  const router = useTransitionRouter();

  const navigateWithTransition = (to: string) => {
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    router.push(to);
  };

  return navigateWithTransition;
};

export default useViewTransition;
