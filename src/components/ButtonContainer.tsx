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
}

const ButtonContainer = ({
  children,
  paddingBottom = 40,
  paddingTop = 16,
  blur,
  isWithdrawal = false
}: ButtonContainerProps) => {
  useKeyboardResizeEffect()
  return (
    <Container
      isWithdrawal={isWithdrawal}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      blur={blur}>
      {children}
    </Container>
  )
}

const Container = styled.div<{
  paddingBottom: number
  paddingTop: number
  blur?: string
  isWithdrawal: boolean
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
  background-color: ${palette.BG};
  backdrop-filter: ${props => (props.blur ? props.blur : 'none')};
  padding-top: ${props => Math.abs(props.paddingTop / 844) * 100}svh;
  padding-bottom: ${props => Math.abs(props.paddingBottom / 844) * 100}svh;

  width: calc(100%);
`

export default ButtonContainer
