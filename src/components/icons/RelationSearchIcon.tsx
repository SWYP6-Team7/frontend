'use client'
import React from 'react'

interface RelationSearchIcon {
  width?: number
  height?: number

  stroke?: string
}

const RelationSearchIcon = ({
  width = 18,
  height = 18,
  stroke = '#CDCDCD'
}: RelationSearchIcon) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.68545 12.4286C9.82544 12.4286 12.3709 9.87018 12.3709 6.71428C12.3709 3.55837 9.82544 1 6.68545 1C3.54546 1 1 3.55837 1 6.71428C1 9.87018 3.54546 12.4286 6.68545 12.4286Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17.0001L10.6653 10.7144"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default RelationSearchIcon
