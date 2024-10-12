import { palette } from '@/styles/palette'
import React from 'react'

interface TripNotificationIconProps {
  size?: number
  circleColor?: string
  heartColor?: string
}

const TripNotificationIcon = ({
  size = 24,
  circleColor = palette.keycolorBG,
  heartColor = palette.keycolor
}: TripNotificationIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        width={size}
        height={size}
        rx="12"
        fill={circleColor}
      />
      <path
        d="M16.8119 7.96156C15.5311 6.67948 13.4438 6.67948 12.163 7.96156L12.005 8.11978L11.9178 8.03249C11.2692 7.38326 10.3754 7.03955 9.44893 7.0341C8.54968 7.04501 7.72128 7.40508 7.11633 8.04885C5.59577 9.65828 5.63392 12.1461 7.19808 13.7118L11.1166 17.6345C11.3619 17.88 11.678 18 11.9995 18C12.3211 18 12.6372 17.88 12.877 17.6345L16.8119 13.7118C17.5803 12.9426 18 11.9224 18 10.8422C18 9.76193 17.5803 8.73627 16.8119 7.97247V7.96156Z"
        fill={heartColor}
      />
    </svg>
  )
}

export default TripNotificationIcon
