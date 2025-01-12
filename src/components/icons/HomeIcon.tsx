'use client'
import { palette } from '@/styles/palette'
interface NavbarIconProps {
  width?: number
  height?: number
  stroke?: string
  fill?: string
}
const HomeIcon = ({
  width = 16,
  height = 15.67,
  stroke = `${palette.비강조3}`,
  fill = 'white'
}: NavbarIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 15.1253V9.06712C17 8.21557 16.6375 7.40156 15.9978 6.81671L10.099 1.42293C9.48224 0.859023 8.51776 0.859023 7.90104 1.42293L2.00212 6.81671C1.36246 7.40156 1 8.21557 1 9.06712V15.1253C1 15.9804 1.71634 16.6735 2.6 16.6735H15.4C16.2837 16.6735 17 15.9804 17 15.1253Z"
        stroke={stroke}
        fill={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default HomeIcon
