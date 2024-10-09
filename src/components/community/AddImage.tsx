import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useRef } from 'react'
import CameraIcon from '../icons/CameraIcon'

const AddImage = () => {
  const imageRef = useRef<HTMLInputElement>(null)

  return (
    <Container>
      <input
        ref={imageRef}
        type="file"
        id="imageInput"
        accept="image/*"
        css={{ display: 'none' }}
      />
      <ImageInput htmlFor="imageInput">
        <CameraIcon />
        <div>0/3</div>
      </ImageInput>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

const ImageInput = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18.5px 26px;
  border: 1px solid ${palette.비강조3};
  border-radius: 15px;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  color: ${palette.비강조};
`

export default AddImage
