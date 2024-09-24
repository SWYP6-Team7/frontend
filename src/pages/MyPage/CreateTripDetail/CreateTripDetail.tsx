import PersonIcon from '@/components/icons/PersonIcon'
import React, { useState, useEffect, useRef } from 'react'
import RecruitingPickerView from './RecruitingPickerView'
import styled from '@emotion/styled'
import ThirdStepIcon from '@/components/icons/ThirdStepIcon'
import { palette } from '@/styles/palette'
import Button from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import CheckIcon from '@/components/icons/CheckIcon'
import Vector from '@/components/icons/Vector'
import BottomModal from '@/components/BottomModal'
import Spacing from '@/components/Spacing'
import RecruitingWrapper from './RecruitingWrapper'
import DuedateWrapper from './DuedateWrapper'

const CreateTripDetail = () => {
  const navigate = useNavigate()
  const completeClickHandler = () => {
    navigate('/')
    // 제출시, zustand에 저장. 후에 코드 추가 및 합치기
    // ex)
    //  createTrip({
    //    recruiting,
    //    duedate,
    //    duration,
    //    tags
    //  })
  }

  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'
  return (
    <CreateTripDetailWrapper>
      <CreateTripDetailContainer>
        <StepIconContainer>
          <ThirdStepIcon />
        </StepIconContainer>
        <ContentTitle>
          여행 상세 정보를
          <br /> 입력해주세요.
        </ContentTitle>

        {/* 모집 인원 부분 */}
        <RecruitingWrapper />
        {/* 모집 마감일 부분 */}

        <DuedateWrapper />

        <div css={{ marginTop: '48px' }}>
          <DetailTitle>태그 설정</DetailTitle>
          {/* flex box */}
          <div>{/* 여러개 배열 map */}</div>
        </div>
        {/* 회색 끝 선 표시 */}
        <div></div>
      </CreateTripDetailContainer>

      <ButtonWrapper width={newRightPosition}>
        <Button
          text="완료"
          onClick={completeClickHandler}
          addStyle={{
            backgroundColor: 'rgba(62, 141, 0, 1)',
            color: 'rgba(240, 240, 240, 1)',
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonWrapper>
    </CreateTripDetailWrapper>
  )
}

export default CreateTripDetail
const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  margin-left: 8px;
`

const ModalWrapper = styled.div``
const ModalContainer = styled.div``
const DetailTitle = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  text-align: left;
  color: ${palette.기본};
  height: 25px;
  padding: 0px 6px;
  gap: 8px;
  opacity: 0px;
`

const RecruitingContainer = styled.div`
  margin-top: 48px;
`
const RecruitingBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  width: 106px;
  height: 48px;
  padding: 12px 16px;
  gap: 0px;
  border-radius: 20px;
  border: 1px solid ${palette.비강조3};
  opacity: 0px;
`
const ButtonWrapper = styled.div<{ width: string }>`
  width: 390px;
  @media (max-width: 389px) {
    width: ${props => props.width};
  }
  @media (max-width: 450px) {
    width: ${props => props.width};
  }
  /* pointer-events: none; */
  position: fixed;
  /* top: 0; */
  bottom: 4.7svh;
  /* z-index: 1001; */

  padding: 0px 24px;
  z-index: 10;
`
const CreateTripDetailWrapper = styled.div``
const CreateTripDetailContainer = styled.div`
  padding: 0px 24px;
`
const StepIconContainer = styled.div`
  margin-top: 24px;
`
const ContentTitle = styled.div`
  margin-top: 40px;
  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;
  color: ${palette.기본};
  text-align: left;
  min-width: 176px;
`
