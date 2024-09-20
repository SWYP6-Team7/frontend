import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

const BottomModal = ({
  children,
  closeModal,
  initialHeight
}: {
  children: React.ReactNode
  closeModal: () => void
  initialHeight: number
}) => {
  const [touchY, setTouchY] = useState(0)
  const [modalHeight, setModalHeight] = useState(initialHeight)
  const [isClosing, setIsClosing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = `${modalHeight}%`
    }
  }, [modalHeight])

  useEffect(() => {
    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    if (contentRef.current) {
      document.body.style.overflow = 'hidden'
      contentRef.current.addEventListener('touchmove', preventTouchMove, {
        passive: false
      })
    }

    return () => {
      document.body.style.overflow = ''
      if (contentRef.current) {
        contentRef.current.removeEventListener('touchmove', preventTouchMove)
      }
    }
  }, [])

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.changedTouches[0].pageY
    const difference = currentY - touchY
    const newHeight = Math.max(
      0,
      Math.min(100, 100 - (difference / window.innerHeight) * 100)
    )
    setModalHeight(newHeight)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchY(e.changedTouches[0].pageY)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const distanceY = e.changedTouches[0].pageY - touchY
    const percentMoved = Math.abs(distanceY) / window.innerHeight

    if (distanceY > 0 && percentMoved > 0.2) {
      setIsClosing(true)
      setTimeout(() => {
        closeModal()
      }, 300)
    } else {
      setModalHeight(100)
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
          onTouchMove={handleTouchMove}
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

  transition: height 0.1s ease-out;
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
