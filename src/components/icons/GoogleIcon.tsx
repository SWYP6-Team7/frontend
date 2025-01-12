'use client'
import React from 'react'

const GoogleIcon = () => {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 62 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <g filter="url(#filter0_d_62_624)">
        <rect
          x="5"
          y="1"
          width="54"
          height="53.3374"
          fill="url(#pattern0_62_624)"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_62_624"
          x="-2"
          y="0"
          width="64"
          height="63.3374"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB">
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset
            dx="-2"
            dy="4"
          />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.415686 0 0 0 0 0.380392 0 0 0 0 0.286275 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_62_624"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_62_624"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_62_624"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <use
            xlinkHref="#image0_62_624"
            transform="scale(0.00613497 0.00621118)"
          />
        </pattern>
        <image
          id="image0_62_624"
          width="163"
          height="161"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}

export default GoogleIcon
