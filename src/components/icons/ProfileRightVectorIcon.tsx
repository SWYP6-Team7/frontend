"use client";
interface VectorProps {
  width?: number;
  height?: number;
}
export default function ProfileRightVectorIcon({ width = 24, height = 24 }: VectorProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 7L14 12L9 17" stroke="#ABABAB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}
