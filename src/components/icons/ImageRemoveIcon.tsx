'use client'
import React from 'react'

interface ImageRemoveIconProps {
  size?: number
}

const ImageRemoveIcon = ({ size = 16 }: ImageRemoveIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        width={size}
        height={size}
        rx="8"
        transform="matrix(1 0 0 -1 0 16)"
        fill="#3E8D00"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 5L11 11L5 5Z"
        fill="white"
      />
      <path
        d="M5 5L11 11"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 5L5 11"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default ImageRemoveIcon
