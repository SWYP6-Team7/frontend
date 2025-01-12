'use client'
import { useEffect, useState } from 'react'

const useInfiniteScroll = (
  callback: () => void,
  dependecy: any[],
  thresholdTime = 2000
) => {
  const [canFetchNextPage, setCanFetchNextPage] = useState(true)

  useEffect(() => {
    if (canFetchNextPage) {
      setCanFetchNextPage(false)
      callback()
      setTimeout(() => {
        setCanFetchNextPage(true)
      }, thresholdTime)
    }
  }, [callback, canFetchNextPage, thresholdTime, ...dependecy])

  return canFetchNextPage
}

export default useInfiniteScroll
