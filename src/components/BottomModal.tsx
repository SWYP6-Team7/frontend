import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

const BottomModal = ({
  children,
  closeModal
}: {
  children: React.ReactNode
  closeModal: () => void
}) => {
  const [touchY, setTouchY] = useState(0)

  const [isClosing, setIsClosing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchY(e.changedTouches[0].pageY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const distanceY = e.changedTouches[0].pageY - touchY

    if (Math.abs(distanceY) / window.innerHeight > 0.1) {
      setIsClosing(true)
      setTimeout(() => {
        closeModal()
      }, 300)
    }
  }

  return (
    <Container onClick={closeModal}>
      <ContentContainer
        ref={contentRef}
        onClick={handleContentClick}
        isClosing={isClosing}>
        <BarContainer
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>
          <Bar />
        </BarContainer>
        {children}
      </ContentContainer>
    </Container>
  )
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideDown = keyframes`
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`

const Container = styled.div`
  height: 100svh;
  position: fixed;
  z-index: 1000;
  width: 100%;
  top: 0;
  left: 0;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }
  background-color: rgba(0, 0, 0, 0.6);
`

const ContentContainer = styled.div<{ isClosing: boolean }>`
  width: 100%;
  bottom: 0;
  @media (min-width: 440px) {
    width: 390px;
  }
  display: block;
  z-index: 2000;
  position: absolute;
  padding: 0 20px;
  padding-top: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;

  animation: ${props => (props.isClosing ? slideDown : slideUp)} 0.3s ease-out
    forwards;

  transition: transform 0.3s ease-out;
`

const Bar = styled.div`
  height: 3px;
  width: 54px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(205, 205, 205, 1);
`

const BarContainer = styled.div`
  display: flex;
  padding: 2.84svh 0;

  position: relative;
`

export default BottomModal
