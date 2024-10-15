import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import CameraIcon from '../icons/CameraIcon'
import { Image } from '@/model/community'
import { useEditStore, useUploadStore } from '@/store/client/imageStore'
import useCommunity from '@/hooks/useCommunity'
import { useParams } from 'react-router-dom'
import { uploadImage } from '@/api/community'
import ImageRemoveIcon from '../icons/ImageRemoveIcon'

interface AddImageProps {
  isEdit: boolean
}

const AddImage = ({ isEdit }: AddImageProps) => {
  const { communityNumber } = useParams()
  const imageRef = useRef<HTMLInputElement>(null)
  const { images, addImage, removeImage } = useUploadStore()
  const {
    images: editImages,
    initializeImages,
    updateImageStatus,
    updateImage
  } = useEditStore()
  const { images: detailImages } = useCommunity(Number(communityNumber))

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    uploadImage(e.target.files[0]).then(newImage => {
      if (isEdit) {
        updateImage(newImage) // 수정 시 이미지 업데이트
      } else {
        addImage(newImage) // 업로드 시 이미지 추가
      }
    })
  }

  const onUploadImageButtonClick = () => {
    if (!imageRef.current) return
    imageRef.current.click()
  }

  const onRemoveImage = (imageNumber: number) => {
    if (isEdit) {
      updateImageStatus(imageNumber, 'd') // 삭제된 이미지는 'd'로 상태 업데이트
    } else {
      removeImage(imageNumber) // 일반 모드에서 이미지 삭제
    }
  }

  useEffect(() => {
    if (isEdit && detailImages.data) {
      initializeImages(detailImages.data)
    }
  }, [isEdit, initializeImages, detailImages.data])
  const canUploadImage = isEdit
    ? editImages.filter(img => img.status !== 'd').length < 3
    : images.filter(img => img.isSelected).length < 3

  return (
    <Container>
      <input
        ref={imageRef}
        onChange={onUploadImage}
        type="file"
        id="imageInput"
        accept="image/*"
        css={{ display: 'none' }}
      />
      {canUploadImage && (
        <ImageInput
          onClick={onUploadImageButtonClick}
          htmlFor="imageInput">
          <CameraIcon />
          <div>
            {isEdit
              ? `${editImages.filter(img => img.status !== 'd').length}/3`
              : `${images.filter(img => img.isSelected).length}/3`}
          </div>
        </ImageInput>
      )}
      {(isEdit
        ? editImages.filter(img => img.status !== 'd')
        : images.filter(img => img.isSelected)
      ).map(image => (
        <ImageDiv
          key={image.imageNumber}
          src={image.url}>
          <RemoveButton onClick={() => onRemoveImage(image.imageNumber)}>
            <ImageRemoveIcon />
          </RemoveButton>
        </ImageDiv>
      ))}
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
  width: 80px;
  height: 80px;
  border: 1px solid ${palette.비강조3};
  border-radius: 15px;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  color: ${palette.비강조};
`

const ImageDiv = styled.div<{ src: string }>`
  width: 80px;
  height: 80px;
  border-radius: 15px;
  position: relative;
  background-image: url('${props => props.src}');
  background-size: cover;
`

const RemoveButton = styled.button`
  display: block;
  position: absolute;
  top: -4px;
  width: 16px;
  height: 16px;
  right: -4px;
`

export default AddImage
