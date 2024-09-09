interface CheckIconProps {
  status?: 'default' | 'done'
  size?: number
}

const CheckIcon = ({ status = 'default', size = 18 }: CheckIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        width={size}
        height={size}
        rx="9"
        fill={status === 'default' ? '#CDCDCD' : '#3E8D00'}
      />
      <path
        d="M5 9L8 12.5L13 5.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CheckIcon
