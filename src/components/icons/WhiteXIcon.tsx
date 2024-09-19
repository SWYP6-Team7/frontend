import React from 'react'

const WhiteXIcon = ({ size = 25 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.2838 2.42793L2.42792 23.2838M23.2838 23.2838L2.42792 2.42793"
        stroke="#F0F0F0"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default WhiteXIcon
