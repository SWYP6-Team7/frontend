import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Slider from 'react-slick'

interface ThreeRowCarouselProps {
  children: ReactNode
}

var settings = {
  dots: true,
  rows: 3,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'dots-custom'
}

const ThreeRowCarousel = ({ children }: ThreeRowCarouselProps) => {
  return (
    <ContentBox>
      <div css={{ width: '100%' }}>
        <Slider {...settings}>{children}</Slider>
      </div>
    </ContentBox>
  )
}

const ContentBox = styled.div`
  margin-top: 22px;
  display: flex;
  background-color: white;
  border-radius: 20px;
  padding-bottom: 16px;
  margin-right: -24px;
  width: 100%;

  .dots-custom {
    position: relative;
    margin-top: 24px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    gap: 8px;

    & li button {
      font-size: 0;
      line-height: 0;
      display: block;

      padding: 5px;
      cursor: pointer;
      color: transparent;
      border: 0;
      outline: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #e3e3e3;
    }

    & li.slick-active button {
      width: 24px;
      border-radius: 30px;
      background-color: ${palette.keycolor};
      transition: width 0.3s ease;
    }
  }
`

export default ThreeRowCarousel
