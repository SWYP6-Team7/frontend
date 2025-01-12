'use client'
import { palette } from '@/styles/palette'
import React from 'react'

interface CommentIconProps {
  fill?: string
  size?: number
  stroke?: string
}

const CommentIcon = ({
  size = 15,
  fill = 'transparent',
  stroke = palette.비강조2
}: CommentIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        stroke={stroke}
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 7.08335C15.0028 8.18323 14.7459 9.26825 14.25 10.25C13.662 11.4265 12.7581 12.416 11.6395 13.1077C10.5209 13.7995 9.23185 14.1662 7.91665 14.1667C6.81677 14.1695 5.73175 13.9126 4.74999 13.4167L0 15L1.58333 10.25C1.08744 9.26825 0.830464 8.18323 0.833332 7.08335C0.833841 5.76815 1.20051 4.47906 1.89226 3.36048C2.58402 2.24189 3.57354 1.33799 4.74999 0.750023C5.73175 0.254133 6.81677 -0.00284397 7.91665 2.374e-05H8.33332C10.0703 0.0958501 11.7108 0.82899 12.9409 2.05907C14.171 3.28915 14.9042 4.92973 15 6.66668V7.08335Z"
        fill={fill}
      />
    </svg>
  )
}

export default CommentIcon
