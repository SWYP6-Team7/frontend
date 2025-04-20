"use client";
import React from "react";

interface CloseIconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

const CloseIcon = ({ width = 48, height = 48, stroke = "#343434" }: CloseIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.7782 16.2218L16.2218 31.7781M31.7782 31.7781L16.2218 16.2218"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseIcon;
