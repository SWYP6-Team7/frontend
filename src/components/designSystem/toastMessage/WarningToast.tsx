"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
interface warningToastProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>> | ((bool: boolean) => void);
  text: string;
  bottom?: string;
  height?: number;
}

export default function WarningToast({ bottom = "20px", isShow, setIsShow, height = 20, text }: warningToastProps) {
  // 약 1초 후 다시 메시지가 아래로 내려감.
  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(false);
      }, 1500);
    }
  }, [isShow]);
  if (!document || !document.getElementById("result-toast")) return null;
  return createPortal(
    <Container isShow={isShow} bottom={bottom}>
      <ToastMsg height={height}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_4770_26768)">
            <circle cx="9" cy="9" r="9" fill="#FDFDFD" />
            <rect x="7.5" y="3" width="3" height="8" rx="1.5" fill="#3E8D00" />
            <rect x="7.5" y="12.5703" width="3" height="3" rx="1.5" fill="#3E8D00" />
          </g>
          <defs>
            <clipPath id="clip0_4770_26768">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <Text>{text}</Text>
      </ToastMsg>
    </Container>,
    document.getElementById("result-toast") as HTMLElement
  );
}
const Container = styled.div<{ isShow: boolean; bottom: string }>`
  position: fixed;
  width: 100%;
  bottom: ${({ isShow, bottom }) =>
    isShow ? bottom : "-100px"}; /* Toast 위치: 나타날 때는 40px, 사라질 때는 아래로 사라짐 */
  transition:
    bottom 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)}; /* 나타날 때는 투명도 1, 사라질 때는 0 */
  pointer-events: none; /* Toast는 클릭할 수 없도록함 */
  display: flex;
  justify-content: center;
  left: 0;
  z-index: 4000;
`;
const ToastMsg = styled.div<{ height: number }>`
  position: absolute;
  bottom: ${(props: { height: number }) => props.height}px;
  height: 42px;
  border-radius: 20px;
  background-color: ${palette.keycolor};
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  margin-left: 8px;
`;
