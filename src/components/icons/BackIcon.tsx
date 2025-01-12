'use client'
import React from 'react'

interface BackIconProps {
  width?: number
  height?: number
  strokeWidth?: number
  stroke?: string
}

// < icon
const BackIcon = ({
  width = 24,
  height = 24,
  strokeWidth = 3,
  stroke = '#343434'
}: BackIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.9354 20.5L7.06445 12L16.9354 3.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BackIcon
