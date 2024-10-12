interface PersonIconProps {
  width?: number
  height?: number
  border?: string
  fill?: string
  stroke?: string
}
const PersonIcon = ({
  width = 9,
  height = 10.8,
  border = '#3E8D00',
  fill = 'none',
  stroke = '#000'
}: PersonIconProps) => {
  return !fill || fill === 'none' ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2808_6752)">
        <path
          d="M17.21 20H2.79C1.25 20 0 18.8 0 17.32V16.79C0 12.44 1.95 10.42 3.95 9.5C3.56 8.63 3.36 7.69 3.36 6.73C3.36 3.02 6.34 0 10 0C13.66 0 16.64 3.02 16.64 6.73C16.64 7.7 16.44 8.64 16.05 9.5C18.06 10.43 20 12.45 20 16.79V17.32C20 18.8 18.75 20 17.21 20ZM10 2C7.44 2 5.36 4.12 5.36 6.73C5.36 7.71 5.66 8.66 6.22 9.46C6.41 9.73 6.45 10.07 6.34 10.37C6.23 10.67 5.98 10.91 5.67 10.99C3.2 11.68 2 13.57 2 16.79V17.32C2 17.7 2.36 18 2.79 18H17.21C17.65 18 18 17.69 18 17.32V16.79C18 13.58 16.8 11.68 14.33 10.99C14.02 10.9 13.77 10.67 13.66 10.37C13.55 10.07 13.6 9.73 13.78 9.46C14.34 8.65 14.64 7.71 14.64 6.73C14.64 4.12 12.56 2 10 2Z"
          fill="#CDCDCD"
        />
      </g>
      <defs>
        <clipPath id="clip0_2808_6752">
          <rect
            width={width}
            height={height}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_2808_8034)">
        <path
          d="M16.05 9.5C16.44 8.63 16.64 7.69 16.64 6.73C16.64 3.02 13.66 0 10 0C6.34 0 3.36 3.02 3.36 6.73C3.36 7.7 3.56 8.64 3.95 9.5C1.94 10.43 0 12.45 0 16.79V17.32C0 18.8 1.25 20 2.79 20H17.21C18.75 20 20 18.8 20 17.32V16.79C20 12.44 18.05 10.43 16.05 9.5Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_2808_8034">
          <rect
            width={width}
            height={height}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
export default PersonIcon
