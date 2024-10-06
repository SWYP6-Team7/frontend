import CreateTripInputField from '@/components/designSystem/input/CreateTripInputField'
import TextareaField from '@/components/designSystem/input/TextareaField'
import Spacing from '@/components/Spacing'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import RecruitingWrapper from '../CreateTrip/CreateTripDetail/RecruitingWrapper'
import DuedateWrapper from '../CreateTrip/CreateTripDetail/DuedateWrapper'
import Accordion from '@/components/Accordion'
import { useNavigate } from 'react-router-dom'
import GreenCheckIcon from '@/components/icons/GreenCheckIcon'
import SearchFilterTag from '@/components/designSystem/tag/SearchFilterTag'
import { palette } from '@/styles/palette'
import Button from '@/components/Button'
import PlaceIcon from '@/components/icons/PlaceIcon'
import ArrowIcon from '@/components/icons/ArrowIcon'
import useTripDetail from '@/hooks/tripDetail/useTripDetail'
import { authStore } from '@/store/client/authStore'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
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
export default function TripEdit() {
  const {
    location,
    title,
    details,
    nowPerson,
    dueDate,
    periodType,
    addPeriodType,
    addTags,
    tags,
    travelNumber,
    addTitle,
    addDetails,
    maxPerson,
    genderType
  } = tripDetailStore()
  const [editingTitle, setEditingTitle] = useState(title)
  const [editingDetails, setEditingDetails] = useState(details)
  const handleRemoveValue = () => setEditingTitle('')
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setEditingTitle(e.target.value)
    addTitle(e.target.value)
  }
  const [initialChecked, setInitialChecked] = useState(false)
  const navigate = useNavigate()
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'
  const { updateTripDetailMutation, isEditSuccess, updateTripDetailMutate } =
    useTripDetail(travelNumber)

  const [tripEditToastShow, setTripEditToastShow] = useState(false) // 상세 글 변경시 보이게 해줄 토스트 메시지
  // 기간
  const { accessToken } = authStore()
  const tripDuration = ['일주일 이하', '1~2주', '3~4주', '한 달 이상']
  const [activeDuration, setActiveDuration] = useState<boolean[]>(
    new Array(4).fill(false)
  )
  useEffect(() => {
    if (periodType === '일주일 이하') {
      setActiveDuration([true, false, false, false])
    } else if (periodType === '1~2주') {
      setActiveDuration([false, true, false, false])
    } else if (periodType === '3~4주') {
      setActiveDuration([false, false, true, false])
    } else {
      setActiveDuration([false, false, false, true])
    }
  }, [])

  // useEffect(() => {
  //   if (isEditSuccess) {
  //     navigate(`/trip/detail/${travelNumber}`)
  //   }
  // }, [isEditSuccess, navigate])

  const durationClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newActiveStates = [false, false, false, false]

    newActiveStates[parseInt(e.currentTarget.id)] = true
    addPeriodType(tripDuration[parseInt(e.currentTarget.id)])
    setActiveDuration(newActiveStates) // 상태 업데이트
  }

  // 태그
  const [taggedArray, setTaggedArray] = useState<string[]>(tags)
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
    addTags(newArray)
    setTaggedArray(newArray)
  }
  const editCompleteClickHandler = async () => {
    // month와 day를 두 자리로 포맷
    const formattedMonth = String(dueDate.month).padStart(2, '0')
    const formattedDay = String(dueDate.day).padStart(2, '0')
    updateTripDetailMutate(
      {
        location,
        title,
        details,
        maxPerson,
        genderType,
        dueDate: `${dueDate.year}-${formattedMonth}-${formattedDay}`,
        periodType,
        tags,
        completionStatus: true
      },
      {
        onSuccess: () => {
          setTripEditToastShow(true)
          setTimeout(() => {
            navigate(-1)
          }, 1000)
        },
        onError: e => {
          console.log(e, '여행 수정에 오류 발생')
        }
      }
    )
    // try {
    //   await updateTripDetailMutation({
    //     location,
    //     title,
    //     details,
    //     maxPerson,
    //     genderType,
    //     dueDate: `${dueDate.year}-${dueDate.month}-${dueDate.day}`,
    //     periodType,
    //     tags,
    //     completionStatus: true
    //   })
    //   if (isEditSuccess) {
    //     navigate(`/trip/detail/${travelNumber}`)
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }
  console.log(title, details, genderType, maxPerson, dueDate, periodType, tags)
  const editLocationHandler = () => {
    navigate(`/editPlace/${travelNumber}`)
  }
  return (
    <Container>
      <ResultToast
        height={120}
        isShow={tripEditToastShow}
        setIsShow={setTripEditToastShow}
        text="게시글이 수정되었어요."
      />
      <City onClick={editLocationHandler}>
        <PlaceIcon />
        <div css={{ marginRight: '4px' }}>{location}</div>
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.999999 1L5.5 5.5L1 10"
            stroke="#A6C58D"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </City>
      <DetailTitle>제목</DetailTitle>
      <Spacing size={8} />
      <CreateTripInputField
        value={title}
        placeholder="제목을 입력해주세요. (최대 20자)"
        handleRemoveValue={handleRemoveValue}
        onChange={changeKeyword}
      />
      <Spacing size={24} />
      <DetailTitle>소개글</DetailTitle>
      <Spacing size={8} />
      <TextareaField
        value={details}
        onChange={e => addDetails(e.target.value)}
        placeholder="어떤 여행을 떠나실 예정인가요?
자유롭게 소개해보세요. (최대 2,000자)"
      />

      {/* 모집 인원 부분 */}
      <Spacing size={24} />
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
                    padding: '10px 20px',
                    fontWeight: isActive(tag) ? '600' : '400'
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
      <ButtonWrapper width={newRightPosition}>
        <Button
          text="완료"
          onClick={editCompleteClickHandler}
          addStyle={{
            backgroundColor: 'rgba(62, 141, 0, 1)',
            color: 'rgba(240, 240, 240, 1)',
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonWrapper>
    </Container>
  )
}
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
  margin-left: -24px;
  z-index: 10;
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
const DetailTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  margin-left: 6px;
`
const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;
  margin-left: 6px;
  text-align: left;
`
const City = styled.div`
  margin-bottom: 16px;
  width: max-content;
  background-color: #e3efd9;
  display: flex;
  align-items: center;
  padding: 9px 12px;
  border-radius: 20px;
  height: 33px;
  gap: 4px;
  color: ${palette.keycolor};

  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;

  text-align: left;
`
const Container = styled.div`
  padding: 0px 24px;
  margin-top: 22px;
`

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
