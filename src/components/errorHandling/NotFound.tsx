'use client'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React from 'react'
import InfoIcon from '../icons/InfoIcon'
import { useRouter } from 'next/navigation'

const NotFound = () => {
  const router = useRouter()
  return (
    <Container>
      <Body>
        <InfoIcon
          size={24}
          color={palette.비강조2}
        />
        <img
          src={'/images/noData.png'}
          width={80}
          height={80}
          alt="No Data Logo Image"
        />
        <Title>페이지를 찾을 수 없습니다.</Title>
        <BackButton onClick={() => router.replace('/')}>
          {/* back icon */}
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 10L0.5 5.5L5 1"
              stroke="#FEFEFE"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div>돌아가기</div>
        </BackButton>
      </Body>
    </Container>
  )
}

// 대중적인 mobile device는 430px 미만
// 그렇기 때문에 440px 이상이면 모바일 환경이 아니라고 생각하고 max-width를 figma layout에 맞춤
const Body = styled.div`
  width: 100svw;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
  background-color: ${palette.검색창};

  @media (max-width: 440px) {
    width: 100svw;
  }
  @media (min-width: 440px) {
    width: 390px;
    overflow-x: hidden;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
// pc환경에서 화면을 가운데 정렬하기 위한 레이아웃 스타일
const Container = styled.div`
  /* height는 홈화면 스크롤을 보기 위해서 auto로 잡아두기. width는 가로스크롤이 생겨서 auto로. */
  height: 100svh;
  width: 100svw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  z-index: 9999;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 25.2px;

  text-align: center;
`

const BackButton = styled.button`
  padding: 9px 12px;
  background-color: ${palette.keycolor};
  display: flex;
  gap: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  align-items: center;
  border-radius: 20px;
  border: none;
  cursor: pointer;
`

export default NotFound
