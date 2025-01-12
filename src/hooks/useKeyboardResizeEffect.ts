'use client'

import { useEffect, useCallback, useState } from 'react'

const useKeyboardResizeEffect = (): void => {
  const [visualViewport, setVisualViewport] = useState<VisualViewport | null>(
    null
  )

  // debounce 함수는 클라이언트에서만 사용되므로 그대로 유지
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

  // handleVisualViewportResize를 useCallback 내부에서 window 접근
  const handleVisualViewportResize = useCallback(() => {
    if (typeof window === 'undefined' || !visualViewport) return

    const currentVisualViewportHeight = visualViewport.height
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
  }, [visualViewport])

  // window 객체 초기화를 useEffect 내부로 이동
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setVisualViewport(window.visualViewport)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const debouncedHandler = debounce(handleVisualViewportResize, 100)

    if (visualViewport) {
      visualViewport.addEventListener('resize', debouncedHandler)
    } else {
      // Fallback for browsers that don't support visualViewport
      window.addEventListener('resize', debouncedHandler)
    }

    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener('resize', debouncedHandler)
      } else {
        window.removeEventListener('resize', debouncedHandler)
      }
    }
  }, [handleVisualViewportResize, visualViewport])
}

export default useKeyboardResizeEffect
