"use client";
import React from "react";

interface PlaceIconProps {
  width?: number;
  height?: number;

  stroke?: string;
}

const PlaceIcon = ({
  width = 18,
  height = 22,
  stroke = "#3E8D00",
}: PlaceIconProps) => {
  if (width === 21) {
    return (
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.2852 10C19.2852 17 10.2852 23 10.2852 23C10.2852 23 1.28516 17 1.28516 10C1.28516 7.61305 2.23337 5.32387 3.9212 3.63604C5.60902 1.94821 7.89821 1 10.2852 1C12.6721 1 14.9613 1.94821 16.6491 3.63604C18.3369 5.32387 19.2852 7.61305 19.2852 10Z"
          stroke="#3E8D00"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10.2813 13C11.9381 13 13.2813 11.6569 13.2813 10C13.2813 8.34315 11.9381 7 10.2813 7C8.6244 7 7.28125 8.34315 7.28125 10C7.28125 11.6569 8.6244 13 10.2813 13Z"
          stroke="#3E8D00"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlaceIcon;
