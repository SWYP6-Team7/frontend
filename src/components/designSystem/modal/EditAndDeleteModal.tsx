"use client";
import styled from "@emotion/styled";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import EditAndDeleteButton from "../Buttons/EditAndDeleteButton";
import { createPortal } from "react-dom";
interface EditAndDeleteModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsEditBtnClicked: React.Dispatch<SetStateAction<boolean>>;
  setIsDeleteBtnClicked: React.Dispatch<SetStateAction<boolean>>;
  isMyApplyTrip?: boolean; // 내가 참가한 여행에서도 사용하기 위함.
  deleteText?: string;
}
export default function EditAndDeleteModal({
  setIsEditBtnClicked,
  setIsDeleteBtnClicked,
  isOpen,
  setIsOpen,
  isMyApplyTrip = false,
  deleteText = "삭제하기",
}: EditAndDeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null); // 모달 참조
  const [isListening, setIsListening] = useState(false); // 모달 창이 열리고, 이벤트 등록이 동기적으로 일어나도록 제한.
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false); // 외부 클릭 시 모달 닫기
    }
  };

  const deleteHandler = () => {
    setIsDeleteBtnClicked(true);
    setIsOpen(false);
  };
  const editHandler = () => {
    setIsEditBtnClicked(true);
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsListening(true);
    }
  }, []);

  if (!isListening) return null;
  return createPortal(
    <Container isOpen={isOpen}>
      <Modal ref={modalRef} isOpen={isOpen} nowWidth={window.innerWidth > 390 ? 390 : window.innerWidth}>
        {!isMyApplyTrip ? (
          <EditAndDeleteButton
            isOpen={isOpen}
            isMyApplyTrip={isMyApplyTrip}
            editClickHandler={editHandler}
            deleteClickHandler={deleteHandler}
          />
        ) : (
          <EditAndDeleteButton
            isOpen={isOpen}
            isMyApplyTrip={isMyApplyTrip}
            editClickHandler={editHandler}
            deleteClickHandler={deleteHandler}
            deleteText={deleteText}
          />
        )}

        <CloseButton setIsOpen={setIsOpen} />
      </Modal>

      <DarkWrapper onClick={handleClickOutside}></DarkWrapper>
    </Container>,
    document.getElementById("end-modal") as HTMLElement
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
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(30%)")};
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
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
