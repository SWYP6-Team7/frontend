import { palette } from '@/styles/palette'

interface NavbarIconProps {
  width?: number
  height?: number
  border?: string
  fill?: string
  stroke?: string
}
const SearchIcon = ({
  width = 16,
  height = 15.67,
  // border = `${palette.비강조3}`,
  fill = 'white',
  stroke = '#000'
}: NavbarIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={stroke}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 16.6735L13.2226 12.9667M15.3158 8.01182C15.3158 11.8843 12.1111 15.0236 8.1579 15.0236C4.2047 15.0236 1 11.8843 1 8.01182C1 4.1393 4.2047 1 8.1579 1C12.1111 1 15.3158 4.1393 15.3158 8.01182Z"
        stroke={stroke}
        fill={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
export default SearchIcon
