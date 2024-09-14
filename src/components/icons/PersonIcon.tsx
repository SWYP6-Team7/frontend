interface PersonIconProps {
  width?: number
  height?: number
}
const PersonIcon = ({ width = 9, height = 10.8 }: PersonIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 11.9012V11.0312C10 10.445 10 10.1522 9.9322 9.91275C9.8486 9.61635 9.69035 9.34634 9.47258 9.12858C9.25481 8.91081 8.98481 8.75255 8.6884 8.66895C8.449 8.60115 8.1562 8.60115 7.57 8.60115H3.43C2.8438 8.60115 2.551 8.60115 2.3116 8.66895C2.01519 8.75255 1.74519 8.91081 1.52742 9.12858C1.30965 9.34634 1.1514 9.61635 1.0678 9.91275C1 10.1522 1 10.445 1 11.0312V11.9012M8.32 3.53715C8.32 4.88415 7.192 5.97615 5.8 5.97615C4.408 5.97615 3.28 4.88415 3.28 3.53715C3.28 2.19015 4.408 1.09875 5.8 1.09875C7.192 1.09875 8.32 2.19075 8.32 3.53715Z"
        stroke="#3E8D00"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default PersonIcon
