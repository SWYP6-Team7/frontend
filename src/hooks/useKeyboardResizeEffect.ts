import { useEffect, useCallback } from 'react'

const useKeyboardResizeEffect = (): void => {
  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  const handleVisualViewportResize = useCallback(() => {
    if (!window.visualViewport) return

    const currentVisualViewportHeight = window.visualViewport.height
    const windowHeight = window.innerHeight
    const keyboardHeight = windowHeight - currentVisualViewportHeight

    if (keyboardHeight > 0) {
      const scrollingElement =
        document.scrollingElement || document.documentElement
      const scrollHeight = scrollingElement.scrollHeight
      const scrollTop = scrollHeight - currentVisualViewportHeight

      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      })

      document.body.style.height = `calc(100% + ${keyboardHeight}px)`
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      document.body.style.height = '100%'
    }
  }, [])

  useEffect(() => {
    const debouncedHandler = debounce(handleVisualViewportResize, 100)

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', debouncedHandler)
    } else {
      // Fallback for browsers that don't support visualViewport
      window.addEventListener('resize', debouncedHandler)
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', debouncedHandler)
      } else {
        window.removeEventListener('resize', debouncedHandler)
      }
    }
  }, [handleVisualViewportResize])
}

export default useKeyboardResizeEffect
