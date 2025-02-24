"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { forwardRef, RefObject } from "react";

interface BoxLayoutTagProps {
  text: React.ReactNode;
  size?: "small" | "medium" | "large";

  addStyle?: {
    backgroundColor?: string;
    color?: string;
    height?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    fontSize?: string;
    fontWeight?: string;
    margin?: string;
  };
}
const BoxLayoutTag = forwardRef(
  (
    {
      text,
      size,

      addStyle = {
        backgroundColor: `${palette.비강조4}`,
        padding: "4px 10px 4px 10px",
        color: `${palette.비강조}`,
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        margin: "0 6px 0 0",
      },
    }: BoxLayoutTagProps,
    ref
  ) => {
    const style = size
      ? size === "large"
        ? {
            ...addStyle,
            padding: "14px 24px",
            fontSize: "16px",
            height: "48px",
            borderRadius: "30px",
          }
        : size === "medium"
          ? {
              ...addStyle,
              padding: "10px 20px",
              fontSize: "16px",
              height: "42px",
              borderRadius: "30px",
            }
          : {
              ...addStyle,
              padding: "8px 14px",
              fontSize: "14px",
              height: "33px",
              borderRadius: "16px",
            }
      : addStyle;
    return (
      <Tag ref={ref} style={style}>
        {text}
      </Tag>
    );
  }
);

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease;
`;

export default BoxLayoutTag;
