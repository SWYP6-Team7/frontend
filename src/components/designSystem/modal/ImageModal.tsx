'use client'
import styled from '@emotion/styled'
import React from 'react'

interface ImageModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  image: string
  count: number
  allCount: number
}

const ImageModal = ({
  setModalOpen,
  image,
  count,
  allCount
}: ImageModalProps) => {
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <Container onClick={handleCloseModal}>
      <TopText>
        사진{' '}
        <span style={{ fontWeight: 400 }}>
          {count}/{allCount}
        </span>
      </TopText>
      <Image
        src={image}
        alt={'big image'}
      />
    </Container>
  )
}

const Container = styled.div`
  height: 100svh;
  position: fixed;
  z-index: 9999;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }

  background-color: rgba(0, 0, 0, 0.6);
`

const Image = styled.img`
  width: 100%;
  max-height: 46.2%;
  object-fit: fill;
`
const TopText = styled.button`
  position: absolute;
  top: 6.2svh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: white;
`

export default ImageModal
