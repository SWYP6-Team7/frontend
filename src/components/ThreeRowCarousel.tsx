import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'
import ButtonContainer from './ButtonContainer'
import Button from './Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { authStore } from '@/store/client/authStore'

interface ThreeRowCarouselProps {
  children: ReactNode
  currentSlideNumber?: number
  setCurrentSlideNumber?: (
    slideNumber: number
  ) => void | React.Dispatch<React.SetStateAction<boolean>>
  itemCountProp?: number
  rowsProp?: number
  needNextBtn?: boolean
}

const ThreeRowCarousel = ({
  children,
  itemCountProp = 3,
  rowsProp = 3,
  needNextBtn = false // 따로 다음으로 넘기는 버튼 필요 여부
}: ThreeRowCarouselProps) => {
  const settings = useMemo(() => {
    const itemCount = React.Children.count(children)
    const rows = rowsProp
    const slidesToShow = 1
    const slidesToScroll = 1

    return {
      dots: itemCount > itemCountProp,
      infinite: false,
      rows,
      slidesToShow,
      slidesToScroll,
      dotsClass: 'dots-custom'
    }
  }, [children])
  // 온보딩 파트.
  const { accessToken } = authStore()

  const slickRef = useRef<Slider>(null) // Slider 타입으로 지정
  const navigate = useNavigate()
  const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id === '다음') {
      setCurrentSlideNumber(currentSlideNumber + 1)
      slickRef.current?.slickNext() // 현재 슬라이드 이동
    } else {
      // 유저가 접속을 새로운 탭에서 시작했을 때, 온보딩 화면 보여줌.
      // 시작하기로 갈 때 만약 액세스 토큰이 없다면 로그인으로 아니면 홈으로.
      if (accessToken === null) {
        navigate('/login')
      } else {
        navigate('/')
      }
    }
  }
  const onClickSkip = () => {
    if (accessToken === null) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }
  const { pathname } = useLocation()
  return (
    <ContentBox isOnboarding={pathname === '/onBoardingOne'}>
      <div css={{ width: '100%', marginBottom: '32px' }}>
        <Slider
          beforeChange={(currentSlide: number, nextSlide: number) =>
            setCurrentSlideNumber(nextSlide)
          }
          ref={slickRef}
          {...settings}>
          {children}
        </Slider>
        {needNextBtn && (
          <ButtonContainer>
            <div
              css={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Button
                onClick={onClickNext}
                text={currentSlideNumber === 2 ? '시작하기' : '다음'}
                id={currentSlideNumber === 2 ? '시작하기' : '다음'}
                addStyle={{
                  backgroundColor: palette.keycolor,
                  color: palette.BG,
                  boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
                }}
              />
              <Skip
                onClick={onClickSkip}
                css={{ marginTop: '16px', padding: '10px' }}>
                건너뛰기
              </Skip>
            </div>
          </ButtonContainer>
        )}
      </div>
    </ContentBox>
  )
}

const ContentBox = styled.div<{ isOnboarding: boolean }>`
  margin-top: ${props => (props.isOnboarding ? '0px' : '22px')};
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding-bottom: 16px;
  margin-right: -24px;
  width: 100%;
  /* 온보딩 */
  max-height: ${window.innerHeight < 740 ? '545px' : 'auto'};
  overflow: hidden;
  /* 온보딩 */
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
const Skip = styled.button`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: rgba(171, 171, 171, 1);
  text-decoration-line: underline;
`
export default ThreeRowCarousel
