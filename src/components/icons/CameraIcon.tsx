'use client'
import React from 'react'

interface CameraIconProps {
  size?: number
  stroke?: string
}

const CameraIcon = ({ size = 21, stroke = '#CDCDCD' }: CameraIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.43202 4.55231L5.85613 2.43179C6.03421 1.54135 6.81606 0.900391 7.72413 0.900391H14.1257C15.0338 0.900391 15.8156 1.54135 15.9937 2.43179L16.4178 4.55231C16.5534 5.2305 17.0677 5.76984 17.7386 5.93758C19.332 6.33594 20.4499 7.76762 20.4499 9.41012V16.1404C20.4499 18.2446 18.7441 19.9504 16.6399 19.9504H5.2099C3.1057 19.9504 1.3999 18.2446 1.3999 16.1404V9.41012C1.3999 7.76762 2.51773 6.33594 4.11115 5.93758C4.78212 5.76984 5.29638 5.2305 5.43202 4.55231Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9247 16.1405C13.029 16.1405 14.7347 14.4347 14.7347 12.3305C14.7347 10.2263 13.029 8.52051 10.9247 8.52051C8.82054 8.52051 7.11475 10.2263 7.11475 12.3305C7.11475 14.4347 8.82054 16.1405 10.9247 16.1405Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.97266 4.70996H11.8777"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CameraIcon
