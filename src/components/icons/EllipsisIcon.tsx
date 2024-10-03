import React from 'react'

interface EllipsisIconProps {
  size?: number
  stroke?: string
}

const EllipsisIcon = ({ size = 32, stroke = '#848484' }: EllipsisIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.4446 7.61122C15.4446 8.19419 15.9171 8.66678 16.5001 8.66678C17.0831 8.66678 17.5557 8.19419 17.5557 7.61122C17.5557 7.02825 17.0831 6.55566 16.5001 6.55566C15.9171 6.55566 15.4446 7.02825 15.4446 7.61122Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.27973"
      />
      <path
        d="M15.4446 16.0556C15.4446 16.6385 15.9171 17.1111 16.5001 17.1111C17.0831 17.1111 17.5557 16.6385 17.5557 16.0556C17.5557 15.4726 17.0831 15 16.5001 15C15.9171 15 15.4446 15.4726 15.4446 16.0556Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.27973"
      />
      <path
        d="M15.4446 24.4999C15.4446 25.0829 15.9171 25.5554 16.5001 25.5554C17.0831 25.5554 17.5557 25.0829 17.5557 24.4999C17.5557 23.9169 17.0831 23.4443 16.5001 23.4443C15.9171 23.4443 15.4446 23.9169 15.4446 24.4999Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.27973"
      />
    </svg>
  )
}

export default EllipsisIcon
