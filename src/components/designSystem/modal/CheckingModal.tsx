import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import { styleText } from 'util'
interface CheckingModalProps {
  isModalOpen: boolean
  modalMsg: string
  modalTitle: string
  modalButtonText: string
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSelected?: React.Dispatch<React.SetStateAction<boolean>>
  onClick?: () => void
}
// setIsSelectd : 수락, 거절 등 버튼을 눌렀을 때, 상위 컴포넌트에서 api요청 해줌.
export default function CheckingModal({
  isModalOpen,
  modalMsg,
  modalTitle,
  modalButtonText,
  setIsSelected,
  onClick,
  setModalOpen
}: CheckingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null) // 모달 참조
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 만약 클릭한 곳이 모달이 아닌 경우
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (isModalOpen) {
          setModalOpen(false)
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
  const clickHandler = () => {
    if (setIsSelected) {
      setIsSelected(true)
    } else if (onClick) {
      onClick()
    }

    setModalOpen(false)
  }
  return (
    <ModalContainer isModalOpen={isModalOpen}>
      <Modal
        ref={modalRef}
        isModalOpen={isModalOpen}>
        <ContentBox>
          <Title>{modalTitle}</Title>
          <Msg>{modalMsg}</Msg>
        </ContentBox>
        <ButtonBox>
          <CloseBtn onClick={() => setModalOpen(false)}>닫기</CloseBtn>
          <SelectBtn onClick={clickHandler}>{modalButtonText}</SelectBtn>
        </ButtonBox>
      </Modal>

      <DarkWrapper></DarkWrapper>
    </ModalContainer>
  )
}
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 23.87px;
  text-align: left;
  margin-bottom: 8px;
  color: ${palette.기본};
`
const Msg = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: center;
  color: ${palette.비강조};
  white-space: pre-line;
`
const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${palette.비강조5};
  margin-top: 16px;
  height: 48px;
`
const CloseBtn = styled.button`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  color: ${palette.비강조2};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`
const SelectBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: ${palette.keycolor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`
const ModalContainer = styled.div<{ isModalOpen: boolean }>`
  height: 100svh;
  padding: 0px 45px;
  width: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: 'pre-line';
  visibility: ${({ isModalOpen }) => (isModalOpen ? 'visible' : 'hidden')};
  opacity: ${({ isModalOpen }) => (isModalOpen ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 76px;
`
const Modal = styled.div<{ isModalOpen: boolean }>`
  width: 300px;
  position: absolute;
  pointer-events: auto;
  padding-top: 24px;
  background-color: #ffffff;
  z-index: 1003;

  height: 164px;

  gap: 16px;
  border-radius: 20px;
  opacity: 0px;
  transform: ${({ isModalOpen }) =>
    isModalOpen ? 'translateY(0)' : 'translateY(30%)'};
  transition: transform 0.3s ease-in-out;
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