"use client";
interface FourthStepIconProps {
  width?: number;
}
const FourthStepIcon = ({ width = 74 }: FourthStepIconProps) => {
  return (
    <svg width="88" height="20" viewBox="0 0 88 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="10" r="3" fill="#E3E3E3" />
      <circle cx="23" cy="10" r="3" fill="#E3E3E3" />
      <circle cx="37" cy="10" r="3" fill="#E3E3E3" />
      <rect x="48" width="20" height="20" rx="10" fill="#3E8D00" />
      <path
        d="M54.584 12.5V11.1055L58.1699 5.51562H60.3848V11.082H61.4629V12.5H60.3848V14H58.709V12.5H54.584ZM56.3652 11.082H58.7324V7.44922H58.6504L56.3652 11.0117V11.082Z"
        fill="#F0F0F0"
      />
      <circle cx="79" cy="10" r="3" fill="#E3E3E3" />
    </svg>
  );
};
export default FourthStepIcon;
