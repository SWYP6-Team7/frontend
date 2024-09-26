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
  const [padding, setPadding] = useState({
    bottom: paddingBottom,
    top: paddingBottom
  })
  const [sticky, setSticky] = useState(false)
  let initialHeight = window.innerHeight

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerHeight < initialHeight) {
        setPadding(prev => ({
          ...prev,
          bottom: 16
        }))
        setSticky(true)
      } else {
        setPadding(prev => ({
          ...prev,
          bottom: paddingBottom
        }))
        setSticky(false)
      }
    })
    return () => {
      window.removeEventListener('resize', () => {})
    }
  }, [])
  useEffect(() => {
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        let visualViewportHeight = window.visualViewport?.height || 0
        let windowHeight = window.innerHeight
        let keyboardHeight = windowHeight - visualViewportHeight
        if (keyboardHeight !== 0) {
          setPadding(prev => ({
            ...prev,
            bottom: keyboardHeight + 16
          }))
          setSticky(true)
        } else {
          setPadding(prev => ({
            ...prev,
            bottom: paddingBottom
          }))
          setSticky(false)
        }
      })
    }
    return () => {
      window?.visualViewport?.removeEventListener('resize', () => {})
    }
  }, [])
  return (
    <Container
      sticky={sticky}
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
  sticky: boolean
}>`
  display: flex;
  align-items: center;
  gap: 16px;
  left: 0;
  bottom: 0;
  position: ${props => (props.sticky ? 'sticky' : 'absolute')};
  padding: 0 24px;
  background-color: white;
  backdrop-filter: ${props => (props.blur ? props.blur : 'none')};
  padding-top: ${props => Math.abs(props.paddingTop / 844) * 100}svh;
  padding-bottom: ${props => Math.abs(props.paddingBottom / 844) * 100}svh;

  width: calc(100%);
`

export default ButtonContainer
