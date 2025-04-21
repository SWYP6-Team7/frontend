"use client";

import { palette } from "@/styles/palette";

interface VectorProps {
  width?: number;
  height?: number;
}
export default function ProfileRightVectorIcon({ width = 17, height = 24 }: VectorProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 7L11.5 12L6.5 17"
        stroke={palette.비강조2}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
