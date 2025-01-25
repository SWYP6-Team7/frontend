"use client";
import { useRouter } from "next/navigation";

const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (to: string) => {
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    const transition = (document as any).startViewTransition(async () => {
      router.push(to);
      await transition.finished;
    });
  };

  return navigateWithTransition;
};

export default useViewTransition;
