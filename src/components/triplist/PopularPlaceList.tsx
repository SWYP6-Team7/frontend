import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom'

const TAG_LIST = [
  { value: '뉴욕', src: '/images/newyork.png' },
  { value: '제주도', src: '/images/jeju.png' },
  { value: '도쿄', src: '/images/tokyo.png' },
  { value: '파리', src: '/images/paris.png' },
  { value: '서울', src: '/images/seoul.png' }
]

const PopularPlaceList = () => {
  return (
    <Container>
      <Title>인기 여행 장소</Title>
      <TagContainer>
        {TAG_LIST.map((item, idx) => (
          <Link
            key={item.value}
            to={`/search/travel?keyword=${item.value}`}>
            <PlaceImage src={item.src}>
              <Background />
              <Text>{item.value}</Text>
            </PlaceImage>
          </Link>
        ))}
      </TagContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
  line-height: 16px;
`

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`

const TagContainer = styled.div`
  display: flex;
  padding: 0 24px;
  position: relative;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 3px;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  overflow-x: scroll;
  align-items: center;
  gap: 8px;
`

const PlaceImage = styled.div<{ src: string }>`
  background-size: cover;
  min-width: 80px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  position: relative;
  font-size: 14px;
  font-weight: 600;
  line-height: 19.6px;

  background-image: url(${props => props.src});
`

const Background = styled.div`
  background-color: #0000004d;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 80px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`

export default PopularPlaceList
