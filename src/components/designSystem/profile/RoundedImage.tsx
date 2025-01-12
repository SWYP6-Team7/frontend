'use client'
import styled from '@emotion/styled'

interface RoundedImageProps {
  size: number
  src: string
}

const RoundedImage = ({ size, src }: RoundedImageProps) => {
  return (
    <Image
      size={size}
      src={src}
    />
  )
}

const Image = styled.div<{ size: number; src: string }>`
  border-radius: 50%;
  height: ${props => props.size}px;
  width: ${props => props.size}px;
  background-image: url(${props => props.src});
  background-color: ${props =>
    props.src === '' ? 'rgba(217, 217, 217, 1)' : 'inherit'};
  background-size: cover;
`

export default RoundedImage
