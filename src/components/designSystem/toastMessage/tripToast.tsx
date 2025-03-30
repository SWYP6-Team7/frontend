"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
interface tripToastProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>> | ((bool: boolean) => void);
  setIsMapFull: React.Dispatch<React.SetStateAction<boolean>> | ((bool: boolean) => void);

  bottom?: string;
  height?: number;
}

export default function TripToast({ setIsMapFull, bottom = "120px", isShow, setIsShow, height = 36 }: tripToastProps) {
  if (!document?.getElementById("trip-toast")) return null;
  return createPortal(
    <Container isShow={isShow} bottom={bottom}>
      <ToastMsg onClick={() => setIsMapFull(true)} height={height}>
        <Text>✨ 여행 일정을 추가해 보세요</Text>
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 1L4.5 5L0.5 1" stroke="white" strokeLinecap="round" />
        </svg>
      </ToastMsg>
    </Container>,
    document?.getElementById("trip-toast") as HTMLElement
  );
}
const Container = styled.div<{ isShow: boolean; bottom: string }>`
  position: fixed;
  width: 100%;
  bottom: ${({ isShow, bottom }) =>
    isShow ? bottom : "-100px"}; /* Toast 위치: 나타날 때는 40px, 사라질 때는 아래로 사라짐 */
  transition: opacity 0.4s ease-in-out;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)}; /* 나타날 때는 투명도 1, 사라질 때는 0 */
  pointer-events: none; /* Toast는 클릭할 수 없도록함 */
  display: flex;
  justify-content: center;
  left: 0;
  z-index: 100;
`;
const ToastMsg = styled.div<{ height: number }>`
  position: absolute;
  bottom: 0;
  height: 36px;
  border-radius: 30px;
  background-color: ${palette.기본};
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  margin-right: 8px;
`;
