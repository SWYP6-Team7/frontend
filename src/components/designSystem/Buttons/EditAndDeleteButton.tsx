import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React from 'react'

interface EditAndDeleteButtonProps {
  isOpen: boolean
  isMyApplyTrip?: boolean // 여행 참가 취소 버튼에도 공용으로 쓰기 위함.
  editClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  deleteClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  deleteText?: string
}
export default function EditAndDeleteButton({
  editClickHandler,
  deleteClickHandler,
  isMyApplyTrip = false,
  deleteText = '삭제하기',
  isOpen
}: EditAndDeleteButtonProps) {
  return (
    <BtnBox
      isMyApplyTrip={isMyApplyTrip}
      isOpen={isOpen}>
      {!isMyApplyTrip && <EditBtn onClick={editClickHandler}>수정하기</EditBtn>}

      <DeleteBtn
        isMyApplyTrip={isMyApplyTrip}
        onClick={deleteClickHandler}>
        {deleteText}
      </DeleteBtn>
    </BtnBox>
  )
}

const BtnBox = styled.div<{ isMyApplyTrip: boolean; isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  height: ${props => (props.isMyApplyTrip ? '52px' : '104px')};

  transform: ${props => (props.isOpen ? 'translateY(-5%)' : 'translateY(20%)')};

  transition: transform 0.5s ease;
`

const EditBtn = styled.button`
  height: 50%;
  @media (max-width: 390px) {
    width: 100%;
  }
  @media (min-width: 390px) {
    width: 342px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;

  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: ${palette.기본};

  border: none;
  border-bottom: 1px solid #e2e2e2;
  border-radius: 20px 20px 0px 0px;

  &:active {
    background-color: ${palette.비강조3};
    border-radius: 20px 20px 0px 0px;
  }
`
const DeleteBtn = styled.button<{ isMyApplyTrip: boolean }>`
  height: ${props => (props.isMyApplyTrip ? '100%' : '50%')};
  @media (max-width: 390px) {
    width: 100%;
  }
  @media (min-width: 390px) {
    width: 342px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: ${palette.like};
  border: none;
  border-radius: 0px 0px 20px 20px;
  &:active {
    background-color: ${palette.비강조3};
    border-radius: 0px 0px 20px 20px;
  }
`
