"use client";
interface WarningIconProps {
  width?: number;
  height?: number;
}
export default function WarningIcon({ width = 18, height = 18 }: WarningIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="6" fill="#FDFDFD" />
      <rect x="8" y="5" width="2" height="5.33333" rx="1" fill="#1A1A1A" />
      <rect x="8" y="11.3804" width="2" height="2" rx="1" fill="#1A1A1A" />
    </svg>
  );
}
