'use client'
import React from 'react'

interface UpArrowIconProps {
  size?: number
  stroke?: string
}

const UpArrowIcon = ({ size = 16, stroke = '#FEFEFE' }: UpArrowIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 14.2223V1.77783"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.77734 8.00005L7.99957 1.77783L14.2218 8.00005"
        stroke="#FEFEFE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default UpArrowIcon
