"use client";
import { useRouter } from "next/navigation";

const useViewTransition = () => {
  const router = useRouter();

  const navigateWithTransition = (to: string) => {
    if (!(document as any).startViewTransition) {
      router.push(to);
      return;
    }

    (document as any).startViewTransition(async () => {
      router.push(to);
    });
  };

  return navigateWithTransition;
};

export default useViewTransition;
