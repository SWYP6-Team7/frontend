interface XIconProps {
  size?: number
}

const XIcon = ({ size = 18 }: XIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        width="18"
        height="18"
        rx="9"
        transform="matrix(1 0 0 -1 0 18)"
        fill="#ABABAB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 6L12 12L6 6Z"
        fill="white"
      />
      <path
        d="M6 6L12 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6L6 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default XIcon
