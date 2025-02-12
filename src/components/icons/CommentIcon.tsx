"use client";
import { palette } from "@/styles/palette";
import Image from "next/image";
import React from "react";

interface CommentIconProps {
  fill?: string;
  size?: number;
  stroke?: string;
}

const CommentIcon = ({ size = 15, fill = "transparent", stroke = palette.비강조2 }: CommentIconProps) => {
  if (fill === "transparent") {
    return <Image src={"/images/comment.svg"} height={size} width={size} alt={""} />;
  } else {
    return <Image src={"/images/comment-active.svg"} height={size} width={size} alt={""} />;
  }
};

export default CommentIcon;
