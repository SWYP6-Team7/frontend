'use client'
import { useRouter } from 'next/navigation'
const useViewTransition = () => {
  const router = useRouter()

  const navigateWithTransition = (to: string) => {
    // Check browser support for View Transitions
    if (!document.startViewTransition) {
      router.push(to)
      return
    }

    // Start view transition
    document.startViewTransition(() => {
      router.push(to)
    })
  }

  return navigateWithTransition
}

export default useViewTransition
