import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { SetStateAction, useEffect, useRef } from 'react'
interface EditAndDeleteModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}
export default function EditAndDeleteModal({
  isOpen,
  setIsOpen
}: EditAndDeleteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null) // 모달 참조
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 만약 클릭한 곳이 모달이 아닌 경우
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false)
        } // 상태를 false로 변경
      }
    }
    // 문서에 click 이벤트를 등록
    document.addEventListener('click', handleClickOutside)

    // cleanup 함수: 이벤트 해제
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <Container isOpen={isOpen}>
      <Modal
        isOpen={isOpen}
        nowWidth={window.innerWidth > 390 ? 390 : window.innerWidth}>
        <BtnBox>
          <EditBtn>수정하기</EditBtn>
          <DeleteBtn>삭제하기</DeleteBtn>
        </BtnBox>

        <CloseBtn onClick={() => setIsOpen(false)}>닫기</CloseBtn>
      </Modal>

      <DarkWrapper></DarkWrapper>
    </Container>
  )
}
const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fdfdfd;
  border-radius: 40px;
  padding: 10px 20px;
  margin-top: 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  color: ${palette.기본};
`
const EditBtn = styled.button`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;

  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: ${palette.기본};
`
const DeleteBtn = styled.button`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: ${palette.like};
`
const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  height: 104px;
`
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
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(30%)')};
  transition: transform 0.3s ease-in-out;
`
const Container = styled.div<{ isOpen: boolean }>`
  height: 100svh;
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  justify-content: center;
  white-space: 'pre-line';
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`
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
`
