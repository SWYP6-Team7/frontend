"use client";
import styled from "@emotion/styled";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import ReportButton from "../Buttons/ReportButton";
import { createPortal } from "react-dom";
interface ReportModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsReportBtnClicked: React.Dispatch<SetStateAction<boolean>>;

  reportText?: string;
}
export default function ReportModal({
  setIsReportBtnClicked,
  isOpen,
  setIsOpen,

  reportText = "신고하기",
}: ReportModalProps) {
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조
  const [isListening, setIsListening] = useState(false); // 모달 창이 열리고, 이벤트 등록이 동기적으로 일어나도록 제한.
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false); // 외부 클릭 시 모달 닫기
    }
  };

  const reportHandler = () => {
    setIsReportBtnClicked(true);
    setIsOpen(false);
  };

  if (typeof window === "undefined") {
    return null;
  }
  if (!isOpen) return null;

  return createPortal(
    <Container isOpen={isOpen}>
      <Modal ref={modalRef} isOpen={isOpen} nowWidth={window.innerWidth > 390 ? 390 : window.innerWidth}>
        <ReportButton isOpen={isOpen} reportClickHandler={reportHandler} reportText={reportText} />

        <CloseButton setIsOpen={setIsOpen} />
      </Modal>

      <DarkWrapper onClick={handleClickOutside}></DarkWrapper>
    </Container>,
    document.getElementById("checking-modal") as HTMLElement
  );
}

const Modal = styled.div<{ isOpen: boolean; nowWidth: number }>`
  width: ${({ nowWidth }) => `calc(${nowWidth}px - 48px)`};
  position: absolute;
  pointer-events: auto;
  padding-top: 24px;

  z-index: 1003;
  bottom: 40px;

  gap: 16px;
  border-radius: 20px;
  opacity: 0px;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(30%)")};
  transition: transform 0.3s ease-in-out;
`;
const Container = styled.div<{ isOpen: boolean }>`
  height: 100svh;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  justify-content: center;
  white-space: "pre-line";
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;
const DarkWrapper = styled.div`
  pointer-events: auto;
  position: absolute;
  width: 100%;
  height: 100svh;
  z-index: 1001;
  top: 0;
  bottom: 0;
  background-color: rgba(26, 26, 26, 0.3);
  opacity: 0.8;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    height: 100svh;
    transform: translateX(-50%);
    overflow-x: hidden;
  }
`;
