"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { styleText } from "util";
interface ResultModalProps {
  isModalOpen: boolean;
  modalMsg: string;
  modalTitle: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>> | ((bool: boolean) => void);
}
export default function NoticeModal({ isModalOpen, modalMsg, modalTitle, setModalOpen }: ResultModalProps) {
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조

  const [isListening, setIsListening] = useState(false); // 모달 창이 열리고, 이벤트 등록이 동기적으로 일어나도록 제한.

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isListening && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModalOpen(false); // 외부 클릭 시 모달 닫기
      }
    };

    if (isModalOpen) {
      // 모달이 열릴 때 이벤트 리스너 등록
      setIsListening(true);
      document.addEventListener("click", handleClickOutside);
    } else {
      setIsListening(false);
    }

    // 컴포넌트가 언마운트되거나 모달이 닫힐 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen, isListening]); // isModalOpen이 변경될 때마다 실행
  return (
    <ModalContainer isModalOpen={isModalOpen}>
      <Modal ref={modalRef} isModalOpen={isModalOpen}>
        <ContentBox>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2950_12210)">
                <circle cx="12" cy="12" r="12" fill="#3E8D00" />
                <rect x="11" y="5" width="2" height="10" rx="1" fill="#FDFDFD" />
                <path
                  d="M11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18Z"
                  fill="#FDFDFD"
                />
              </g>
              <defs>
                <clipPath id="clip0_2950_12210">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <Title>{modalTitle}</Title>
          <Msg>{modalMsg}</Msg>
        </ContentBox>
        <ButtonBox>
          <CloseBtn onClick={() => setModalOpen(false)}>닫기</CloseBtn>
        </ButtonBox>
      </Modal>

      <DarkWrapper></DarkWrapper>
    </ModalContainer>
  );
}
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 23.87px;
  text-align: left;
  margin: 8px 0px;
  color: ${palette.기본};
`;
const Msg = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: center;
  color: ${palette.비강조};
  white-space: pre-line;
`;
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${palette.비강조5};
  margin-top: 16px;
  height: 48px;
`;
const CloseBtn = styled.button`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  color: ${palette.비강조2};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  &:active {
    background-color: ${palette.buttonActive};
  }
`;

const ModalContainer = styled.div<{ isModalOpen: boolean }>`
  height: 100svh;
  padding: 0px 45px;
  width: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: "pre-line";
  visibility: ${({ isModalOpen }) => (isModalOpen ? "visible" : "hidden")};
  opacity: ${({ isModalOpen }) => (isModalOpen ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 108px;
`;
const Modal = styled.div<{ isModalOpen: boolean }>`
  width: 300px;
  position: absolute;
  pointer-events: auto;
  padding-top: 24px;
  background-color: #ffffff;
  z-index: 1003;

  height: 196px;

  gap: 16px;
  border-radius: 20px;
  opacity: 0px;
  transform: ${({ isModalOpen }) => (isModalOpen ? "translateY(0)" : "translateY(30%)")};
  transition: transform 0.3s ease-in-out;
`;
const DarkWrapper = styled.div`
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
