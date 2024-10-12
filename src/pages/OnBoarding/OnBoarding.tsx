import Button from '@/components/Button'
import ButtonContainer from '@/components/ButtonContainer'
import styled from '@emotion/styled'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ThreeRowCarousel from '@/components/ThreeRowCarousel'

import React, { ButtonHTMLAttributes, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTripList } from '@/hooks/useTripList'
import { userStore } from '@/store/client/userStore'
import { IMyTripList } from '@/model/myTrip'
import HorizonBoxLayout from '@/components/HorizonBoxLayout'
import { daysAgo } from '@/utils/time'
import dayjs from 'dayjs'
import OnBoardingOne from '@/components/icons/OnBoardingOne'
import OnBoardingTwo from '@/components/icons/OnBoardingTwo'
import OnBoardingThree from '@/components/icons/OnBoardingThree'
import { palette } from '@/styles/palette'
import { authStore } from '@/store/client/authStore'
interface OnBoardingData {
  title: string
  description: string
  svg: React.ReactNode
}

export default function OnBoarding() {
  const { data } = useTripList('recommend')
  const { name } = userStore()

  const trips = (data?.pages[0].content as IMyTripList['content']) ?? []
  const cutTrips = trips?.length > 9 ? trips.slice(0, 3) : trips

  const steps: OnBoardingData[] = [
    {
      title: `누구나 자유롭게 \n 만드는 여행`,
      description: `여행 멤버들을 모집하고, \n 설레는 여행을 떠나보세요!`,
      svg: <OnBoardingOne />
    },
    {
      title: `원하는 조건만 쏙! \n 맞춤 여행 검색`,
      description: `떠나고 싶은 곳 또는 나와 딱 맞는 \n 스타일의 여행을 찾을 수 있어요.`,
      svg: <OnBoardingTwo />
    },
    {
      title: `모잉 멤버들과 \n 나누는 여행 이야기`,
      description: `여행에 대한 정보와 팁 등\n 다양한 이야기를 공유해보세요.`,
      svg: <OnBoardingThree />
    }
  ]

  return (
    <Container>
      <ThreeRowCarousel
        needNextBtn={true}
        rowsProp={1}
        itemCountProp={0}>
        {steps.map(step => (
          <div
            css={{ padding: '18px 16px' }}
            key={step.title}>
            <TextBox>
              <Title>{step.title}</Title>
              <Description>{step.description}</Description>
            </TextBox>
            <Img>{step.svg}</Img>
          </div>
        ))}
      </ThreeRowCarousel>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100svh;
`
const TextBox = styled.div`
  /* margin-bottom: 72px; */
`

const Title = styled.div`
  white-space: pre-line;
  font-family: Pretendard;
  font-size: 26px;
  font-weight: 600;
  line-height: 36.4px;
  color: ${palette.기본};
  text-align: center;
  margin-bottom: 16px;
`
const Description = styled.div`
  white-space: pre-line;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: -0.25px;
  text-align: center;
  color: ${palette.비강조};
`

const Img = styled.div`
  display: flex;
  justify-content: center;
`
