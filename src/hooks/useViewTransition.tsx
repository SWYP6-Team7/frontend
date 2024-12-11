import { useEffect } from 'react'
import { To, useLocation, useNavigate } from 'react-router-dom'
const useViewTransition = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const navigateWithTransition = (to: To) => {
    // Check browser support for View Transitions
    if (!document.startViewTransition) {
      navigate(to)
      return
    }

    // Start view transition
    document.startViewTransition(() => {
      navigate(to)
    })
  }

  return navigateWithTransition
}

export default useViewTransition
