'use client'
import React from 'react'

interface CommunityNotificationProps {
  size?: number
}

const CommunityNotification = ({ size = 24 }: CommunityNotificationProps) => {
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
        fill="#FF820A"
      />
      <path
        d="M16.9978 12.004C18.0895 10.8756 18.3894 9.09297 17.3937 7.58046C16.9738 6.94424 16.338 6.44607 15.6002 6.19999C14.2986 5.76784 12.9549 6.05594 12.0012 6.87222C11.0415 6.05594 9.68582 5.76784 8.37819 6.21199C7.64639 6.46408 7.01056 6.96225 6.59068 7.60447C5.61895 9.11098 5.91286 10.8816 7.00456 12.004C5.91286 13.1263 5.61295 14.9029 6.59668 16.4095C7.01656 17.0517 7.65239 17.5498 8.39018 17.7959C9.69782 18.2341 11.0474 17.946 12.0012 17.1297C12.4631 17.5258 13.0089 17.7959 13.6207 17.922C13.8727 17.976 14.1306 18 14.3765 18C16.0501 18 17.5557 16.8536 17.9156 15.191C18.1675 14.0327 17.8136 12.8382 16.9918 11.998L16.9978 12.004Z"
        fill="#FEFEFE"
      />
    </svg>
  )
}

export default CommunityNotification
