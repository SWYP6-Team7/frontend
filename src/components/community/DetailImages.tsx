import styled from '@emotion/styled'
import { useState } from 'react'
import ImageModal from '../designSystem/modal/ImageModal'

interface DetailImagesProps {
  images: string[]
}

interface ImageInfo {
  image: string
  count: number
  allCount: number
}

const DetailImages = ({ images }: DetailImagesProps) => {
  const [openModal, setOpenModal] = useState(false)
  const [imageInfo, setImageInfo] = useState<ImageInfo>()
  const onClickImage = (imageInfo: ImageInfo) => {
    setImageInfo(imageInfo)
    setOpenModal(true)
  }
  return (
    <>
      {openModal && imageInfo && (
        <ImageModal
          setModalOpen={setOpenModal}
          {...imageInfo}
        />
      )}
      <Container length={images.length}>
        {images.map((image, idx) => (
          <Image
            key={idx}
            onClick={() =>
              onClickImage({
                image: image,
                allCount: images.length,
                count: idx + 1
              })
            }
            image={image}
          />
        ))}
      </Container>
    </>
  )
}

const Container = styled.div<{ length: number }>`
  width: 100%;
  height: 191px;
  border-radius: 15px;
  display: grid;
  gap: 11px;
  grid-template-columns: ${props => (props.length > 1 ? '1fr 1fr' : '1fr')};
  & > div:nth-child(1) {
    ${props => props.length === 3 && 'grid-row: 1 / span 2'};
  }
`
const Image = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});

  background-size: cover;
  border-radius: 15px;
`

export default DetailImages
