interface SelectArrowProps {
  width?: number
  height?: number
}

const SelectArrow = ({ width = 12, height = 7 }: SelectArrowProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 1.16667L6 5.83334L1 1.16667"
        stroke="#343434"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default SelectArrow
