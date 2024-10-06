import useKeyboardResizeEffect from '@/hooks/useKeyboardResizeEffect'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

interface ButtonContainerProps {
  children: React.ReactNode
  paddingBottom?: number
  paddingTop?: number
  blur?: string
}

const ButtonContainer = ({
  children,
  paddingBottom = 40,
  paddingTop = 16,
  blur
}: ButtonContainerProps) => {
  useKeyboardResizeEffect()
  return (
    <Container
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
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  left: 0;
  bottom: 0;
  position: absolute;
  padding: 0 24px;
  background-color: white;
  backdrop-filter: ${props => (props.blur ? props.blur : 'none')};
  padding-top: ${props => Math.abs(props.paddingTop / 844) * 100}svh;
  padding-bottom: ${props => Math.abs(props.paddingBottom / 844) * 100}svh;

  width: calc(100%);
`

export default ButtonContainer
