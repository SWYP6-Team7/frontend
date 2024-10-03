import React from 'react'
interface MoreIconProps {
  size?: number
  stroke?: string
}
export default function MoreIcon({
  size = 20,
  stroke = '#1A1A1A'
}: MoreIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.44455 2.61122C1.44455 3.19419 1.91714 3.66678 2.50011 3.66678C3.08308 3.66678 3.55566 3.19419 3.55566 2.61122C3.55566 2.02825 3.08308 1.55566 2.50011 1.55566C1.91714 1.55566 1.44455 2.02825 1.44455 2.61122Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.27973"
      />
      <path
        d="M1.44455 11.0556C1.44455 11.6385 1.91714 12.1111 2.50011 12.1111C3.08308 12.1111 3.55566 11.6385 3.55566 11.0556C3.55566 10.4726 3.08308 10 2.50011 10C1.91714 10 1.44455 10.4726 1.44455 11.0556Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.27973"
      />
      <path
        d="M1.44455 19.5001C1.44455 20.0831 1.91714 20.5557 2.50011 20.5557C3.08308 20.5557 3.55566 20.0831 3.55566 19.5001C3.55566 18.9172 3.08308 18.4446 2.50011 18.4446C1.91714 18.4446 1.44455 18.9172 1.44455 19.5001Z"
        fill={stroke}
        stroke={stroke}
        strokeWidth="1.27973"
      />
    </svg>
  )
}
