interface ArrowProps {
  size?: number
}

const ArrowIcon = ({ size = 48 }: ArrowProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 32L28 24L20 16"
        stroke="#848484"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default ArrowIcon
