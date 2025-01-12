'use client'
import React from 'react'
interface RightVectorProps {
  width?: number
  height?: number
  stroke?: string
}
export default function RightVector({
  width = 9,
  height = 17,
  stroke = '#ABABAB'
}: RightVectorProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1.5L8 8.5L1 15.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
