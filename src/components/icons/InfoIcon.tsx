'use client'
interface InfoIconProps {
  color?: string
  size?: number
}

const InfoIcon = ({ color = '#ABABAB', size = 14 }: InfoIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_7_343)">
        <circle
          cx="7"
          cy="7"
          r="7"
          fill={color}
        />
        <rect
          x="6"
          y="2"
          width="2"
          height="7"
          rx="1"
          fill="white"
        />
        <rect
          x="6"
          y="9.96777"
          width="2"
          height="2"
          rx="1"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7_343">
          <rect
            width="14"
            height="14"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default InfoIcon
