import React from 'react'

interface BackIconProps {
  size?: number
}

// < icon
const BackIcon = ({ size = 24 }: BackIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.9354 20.5L7.06445 12L16.9354 3.5"
        stroke="#343434"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default BackIcon
