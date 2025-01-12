'use client'
import useKeyboardResizeEffect from '@/hooks/useKeyboardResizeEffect'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

interface ButtonContainerProps {
  children: React.ReactNode
  paddingBottom?: number
  paddingTop?: number
  blur?: string
  isWithdrawal?: boolean
  backgroundColor?: string
}

const ButtonContainer = ({
  children,
  paddingBottom = 40,
  paddingTop = 16,
  blur,
  isWithdrawal = false,
  backgroundColor = palette.BG
}: ButtonContainerProps) => {
  useKeyboardResizeEffect()
  return (
    <Container
      isWithdrawal={isWithdrawal}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      blur={blur}
      backgroundColor={backgroundColor}>
      {children}
    </Container>
  )
}

const Container = styled.div<{
  paddingBottom: number
  paddingTop: number
  blur?: string
  isWithdrawal: boolean
  backgroundColor: string
}>`
  display: flex;
  flex-direction: ${props => props.isWithdrawal && 'column'};
  align-items: center;
  gap: 16px;
  left: 0;
  bottom: 0;
  position: fixed;
  width: 100%;

  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }

  padding: 0 24px;
  background-color: ${props => props.backgroundColor};
  backdrop-filter: ${props => (props.blur ? props.blur : 'none')};

  height: 104px;
  padding: 16px 24px 40px 24px;
  width: calc(100%);
`

export default ButtonContainer
