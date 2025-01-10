interface FirstStepIconProps {
  width?: number
}
const FirstStepIcon = ({ width = 60 }) => {
  return (
    <svg
      width="60"
      height="20"
      viewBox="0 0 60 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="6"
        width="20"
        height="20"
        rx="10"
        fill="#3E8D00"
      />

      <path
        d="M17.5117 5.51562V14H15.7422V7.19141H15.6953L13.75 8.41016V6.85156L15.8477 5.51562H17.5117Z"
        fill="#F0F0F0"
      />
      <circle
        cx="37"
        cy="10"
        r="3"
        fill="#E3E3E3"
      />
      <circle
        cx="51"
        cy="10"
        r="3"
        fill="#E3E3E3"
      />
    </svg>
  )
}

export default FirstStepIcon
