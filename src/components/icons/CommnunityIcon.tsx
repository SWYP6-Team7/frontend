import { palette } from '@/styles/palette'

interface NavbarIconProps {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}
const BookIcon = ({
  width = 16,
  height = 14,
  stroke = `${palette.비강조3}`,
  fill = 'none'
}: NavbarIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 2.75C1 2.75 2.2 1 5 1C7.8 1 9 2.75 9 2.75V15C9 15 7.8 14.125 5 14.125C2.2 14.125 1 15 1 15V2.75Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 2.75C9 2.75 10.2 1 13 1C15.8 1 17 2.75 17 2.75V15C17 15 15.8 14.125 13 14.125C10.2 14.125 9 15 9 15V2.75Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default BookIcon
