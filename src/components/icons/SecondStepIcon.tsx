interface SecondStepIconProps {
  width?: number
}

const SecondStepIcon = ({ width = 60 }: SecondStepIconProps) => {
  return (
    <svg
      width={width}
      height="20"
      viewBox="0 0 60 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="9"
        cy="10"
        r="3"
        fill="#E3E3E3"
      />
      <rect
        x="20"
        width="20"
        height="20"
        rx="10"
        fill="#3E8D00"
      />
      <path
        d="M27.0059 14L26.9941 12.7227L30.041 9.92188C30.832 9.16602 31.2598 8.69727 31.2598 8.02344C31.2598 7.26758 30.6914 6.79883 29.9121 6.80469C29.1152 6.79883 28.5938 7.30273 28.5996 8.11719H26.9238C26.918 6.45898 28.1484 5.39844 29.9355 5.39844C31.752 5.39844 32.959 6.43555 32.959 7.90625C32.959 8.87305 32.4902 9.66406 30.7441 11.2461L29.4551 12.5V12.5469H33.0762V14H27.0059Z"
        fill="#F0F0F0"
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
export default SecondStepIcon
