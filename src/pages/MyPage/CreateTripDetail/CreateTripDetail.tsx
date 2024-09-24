import PersonIcon from '@/components/icons/PersonIcon'
import React, { useState, useEffect, useRef, MouseEventHandler } from 'react'
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
import GreenCheckIcon from '@/components/icons/GreenCheckIcon'
import Accordion from '@/components/Accordion'
import SearchFilterTag from '@/components/designSystem/tag/SearchFilterTag'

const TAG_LIST = [
  {
    title: '태그 설정',
    tags: [
      '⏱️ 단기',
      '✊ 즉흥',
      '📝 계획',
      '🧳 중장기',
      '🏄‍♂️ 액티비티',
      '☁️ 여유',
      '🍔 먹방',
      '💸 가성비',
      '📷 핫플',
      '🛍️ 쇼핑',
      '🎨 예술',
      '🗿 역사',
      '🏔️ 자연',
      '🥳 단체',
      '😊 소수'
    ] as const
  }
]

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
  const [selectedDuration, setSelectedDuration] = useState(0) // 선택된 기간 인덱스.
  const tripDuration = ['일주일 이하', '1~2주', '3~4주', '한 달 이상']
  const [activeDuration, setActiveDuration] = useState<boolean[]>(
    new Array(4).fill(false)
  )

  const durationClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newActiveStates = [false, false, false, false]

    newActiveStates[parseInt(e.currentTarget.id)] = true
    setSelectedDuration(parseInt(e.currentTarget.id))
    setActiveDuration(newActiveStates) // 상태 업데이트
  }

  // 태그
  const [taggedArray, setTaggedArray] = useState<string[]>([])
  const getTaggedCount = () => {
    return taggedArray.length
  }

  const isActive = (tag: string) => {
    return taggedArray.includes(tag)
  }

  const clickTag = (tag: string) => {
    const newArray = taggedArray.includes(tag)
      ? taggedArray.filter(v => v !== tag)
      : [...taggedArray, tag]

    setTaggedArray(newArray)
  }

  const [initialChecked, setInitialChecked] = useState(false)
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'
  const [showModal, setShowModal] = useState(false)
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

        <DurationContainer>
          <DetailTitle>여행 기간</DetailTitle>

          <DurationBox>
            {tripDuration.map((duration, idx) => (
              <DurationBtn
                isActive={activeDuration[idx]}
                key={duration}
                id={idx.toString()}
                onClick={durationClickHandler}>
                {duration}
                {activeDuration[idx] && <GreenCheckIcon />}
              </DurationBtn>
            ))}
          </DurationBox>
        </DurationContainer>
        {/* 회색 끝 선 표시 */}
        <div></div>
        <div css={{ marginTop: '29.5px' }}>
          {TAG_LIST.map(item => (
            <Accordion
              count={getTaggedCount()}
              id="태그 설정"
              title="태그 설정"
              initialChecked={initialChecked}
              key={item.title}>
              <TagContainer>
                {item.tags?.map((tag, idx) => (
                  <SearchFilterTag
                    key={tag}
                    idx={idx}
                    addStyle={{
                      backgroundColor: isActive(tag)
                        ? 'rgba(227, 239, 217, 1)'
                        : ' rgba(240, 240, 240, 1)',
                      color: isActive(tag)
                        ? `${palette.keycolor}`
                        : 'rgba(52, 52, 52, 1)',

                      border: isActive(tag)
                        ? `1px solid ${palette.keycolor}`
                        : `1px solid ${palette.검색창}`,
                      borderRadius: '30px',
                      padding: '10px 20px'
                    }}
                    text={tag}
                    onClick={() => clickTag(tag)}
                  />
                ))}
              </TagContainer>
            </Accordion>
          ))}
        </div>
        {/* 회색 끝 선 표시 */}

        <Spacing size={120} />
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

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`
const DurationBtn = styled.button<{ isActive: boolean }>`
  width: 48%;
  height: 48px;
  padding: 0px 24px;
  gap: 0px;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => (props.isActive ? palette.keycolor : palette.비강조)};
  background-color: ${props =>
    props.isActive ? palette.keycolorBG : palette.검색창};
  border: ${props =>
    props.isActive
      ? `1px solid ${palette.keycolor}`
      : `1px solid ${palette.검색창}`};
`
const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  margin-left: 8px;
`
const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  overflow: hidden;
`

const ModalContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 20px;
  padding-bottom: 13svh;
`
const DurationContainer = styled.div`
  margin-top: 24px;
`
const DurationBox = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
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
