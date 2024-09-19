import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

const BottomModal = ({
  children,
  closeModal
}: {
  children: React.ReactNode
  closeModal: () => void
}) => {
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <Container onClick={closeModal}>
      <ContentContainer onClick={handleContentClick}>
        <BarContainer>
          <Bar />
        </BarContainer>
        {children}
      </ContentContainer>
    </Container>
  )
}

const Bar = styled.div`
  height: 3px;
  width: 54px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(205, 205, 205, 1);
`

const BarContainer = styled.div`
  display: flex;
  position: relative;
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

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(9);
    opacity: 1;
  }
`

const ContentContainer = styled.div`
  width: 100%;
  bottom: 0;

  @media (min-width: 440px) {
    width: 390px;
  }
  z-index: 2000;
  position: absolute;
  padding: 0 20px;
  padding-top: 24px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  animation: ${slideUp} 0.5s ease-out forwards;
`

export default BottomModal
