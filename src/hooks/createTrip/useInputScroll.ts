'use client'
import React, { useEffect } from 'react'

const useInputScroll = (ref: React.RefObject<HTMLInputElement | null>) => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('touchmove', handleScroll)
    return () => {
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  const handleScroll = (e: { target: any }) => {
    if (
      document.activeElement == ref.current ||
      ref.current?.contains(e.target)
    ) {
      ;(document.activeElement as HTMLElement).blur()
    }
  }
}

const useTextAreaScroll = (
  ref: React.RefObject<HTMLTextAreaElement | null>
) => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('touchmove', handleScroll)
    return () => {
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  const handleScroll = (e: { target: any }) => {
    if (
      document.activeElement == ref.current ||
      ref.current?.contains(e.target)
    ) {
      ;(document.activeElement as HTMLElement).blur()
    }
  }
}

export { useInputScroll, useTextAreaScroll }
