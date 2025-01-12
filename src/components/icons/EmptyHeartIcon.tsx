'use client'
interface HeartProps {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}

const EmptyHeartIcon = ({
  width = 26,
  height = 24,
  stroke = 'white',
  fill = 'none'
}: HeartProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 1.33325C3.6863 1.33325 1 3.99268 1 7.27325C1 9.92165 2.04959 16.2069 12.385 22.5616C12.7593 22.7918 13.2407 22.7918 13.615 22.5616C23.9504 16.2069 25 9.92165 25 7.27325C25 3.99268 22.3137 1.33325 19 1.33325C15.6863 1.33325 13 4.93325 13 4.93325C13 4.93325 10.3137 1.33325 7 1.33325Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default EmptyHeartIcon
