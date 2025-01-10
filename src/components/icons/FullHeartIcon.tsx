interface HeartProps {
  width?: number
  height?: number
  color?: string
}

const FullHeartIcon = ({
  width = 24,
  height = 24,
  color = '#EA2A2A'
}: HeartProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 0.333252C2.6863 0.333252 0 2.99268 0 6.27325C0 8.92165 1.04959 15.2069 11.385 21.5616C11.7593 21.7918 12.2407 21.7918 12.615 21.5616C22.9504 15.2069 24 8.92165 24 6.27325C24 2.99268 21.3137 0.333252 18 0.333252C14.6863 0.333252 12 3.93325 12 3.93325C12 3.93325 9.3137 0.333252 6 0.333252Z"
        fill={color}
      />
    </svg>
  )
}
export default FullHeartIcon
