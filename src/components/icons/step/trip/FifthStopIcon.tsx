"use client";
interface FifthStepIconProps {
  width?: number;
}
const FifthStepIcon = ({ width = 74 }: FifthStepIconProps) => {
  return (
    <svg width="88" height="20" viewBox="0 0 88 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="10" r="3" fill="#E3E3E3" />
      <circle cx="23" cy="10" r="3" fill="#E3E3E3" />
      <circle cx="37" cy="10" r="3" fill="#E3E3E3" />
      <circle cx="51" cy="10" r="3" fill="#E3E3E3" />
      <rect x="62" width="20" height="20" rx="10" fill="#3E8D00" />
      <path
        d="M72.0234 14.1172C70.2539 14.1172 68.959 13.0742 68.9297 11.6094H70.6406C70.6816 12.2715 71.2852 12.7285 72.0234 12.7227C72.9023 12.7285 73.5293 12.1074 73.5234 11.2227C73.5293 10.3203 72.8906 9.69336 72 9.6875C71.3613 9.6875 70.916 9.92773 70.6641 10.4023H69.0703L69.5273 5.51562H74.7539V6.95703H70.9805L70.7461 9.10156H70.8164C71.127 8.68555 71.7715 8.38086 72.5156 8.38672C74.0742 8.38086 75.2344 9.54688 75.2344 11.1758C75.2344 12.8926 73.9336 14.1172 72.0234 14.1172Z"
        fill="#F0F0F0"
      />
    </svg>
  );
};
export default FifthStepIcon;
