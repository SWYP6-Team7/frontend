import { useEffect } from 'react'
import { useLocation } from 'react-router'

const useViewTransition = () => {
  const location = useLocation()

  useEffect(() => {
    // Check if the browser supports View Transitions API
    if (!document.startViewTransition) return

    // Start view transition for route changes
    document.startViewTransition(() => {
      // This will trigger the native transition
    })
  }, [location.pathname])
}

export default useViewTransition
