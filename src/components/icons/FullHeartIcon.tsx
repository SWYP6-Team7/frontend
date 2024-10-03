interface HeartProps {
  width?: number
  height?: number
}

const FullHeartIcon = ({ width = 24, height = 22 }: HeartProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 1C3.23858 1 1 3.21619 1 5.95C1 8.157 1.87466 13.3947 10.4875 18.6903C10.7994 18.8821 11.2006 18.8821 11.5125 18.6903C20.1253 13.3947 21 8.157 21 5.95C21 3.21619 18.7614 1 16 1C13.2386 1 11 4 11 4C11 4 8.76142 1 6 1Z"
        fill="#EA2A2A"
        stroke="#EA2A2A"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default FullHeartIcon
