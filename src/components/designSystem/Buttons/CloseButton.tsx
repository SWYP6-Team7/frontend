'use client'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React from 'react'

interface CloseButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function CloseButton({ setIsOpen }: CloseButtonProps) {
  return <CloseBtn onClick={() => setIsOpen(false)}>닫기</CloseBtn>
}

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 390px) {
    width: 100%;
  }
  @media (min-width: 390px) {
    width: 342px;
  }
  border: none;
  height: 48px;
  background-color: ${palette.BG};
  border-radius: 40px;
  padding: 10px 20px;
  margin-top: 16px;
  font-size: 18px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  color: ${palette.기본};
  &:active {
    background-color: ${palette.비강조3};
  }
`
