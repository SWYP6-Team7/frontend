"use client";
import React from "react";

export default function Vector({ stroke = "#CDCDCD" }) {
  return (
    <svg width="14" height="8" fill="none" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0.999999L7 7L1 1" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
