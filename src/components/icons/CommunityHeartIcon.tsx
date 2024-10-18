import { palette } from '@/styles/palette'

interface CommunityHeartIconProps {
  size?: number
  fill?: string
}

const CommunityHeartIcon = ({
  size = 20,
  fill = palette.keycolor
}: CommunityHeartIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        width={size}
        height={size}
        rx="10"
        fill={fill}
      />
      <path
        d="M14.2289 6.77356C13.9846 6.52832 13.6944 6.33378 13.3751 6.20105C13.0558 6.06832 12.7136 6 12.3679 6C12.0223 6 11.6801 6.06832 11.3607 6.20105C11.0414 6.33378 10.7513 6.52832 10.507 6.77356L9.99987 7.28229L9.49277 6.77356C8.99921 6.27842 8.3298 6.00026 7.6318 6.00026C6.93381 6.00026 6.2644 6.27842 5.77084 6.77356C5.27728 7.2687 5 7.94026 5 8.64049C5 9.34072 5.27728 10.0123 5.77084 10.5074L6.27794 11.0161L9.99987 14.75L13.7218 11.0161L14.2289 10.5074C14.4734 10.2623 14.6673 9.97125 14.7996 9.65091C14.9319 9.33058 15 8.98723 15 8.64049C15 8.29375 14.9319 7.9504 14.7996 7.63007C14.6673 7.30973 14.4734 7.01869 14.2289 6.77356Z"
        fill="#FDFDFD"
      />
    </svg>
  )
}

export default CommunityHeartIcon
