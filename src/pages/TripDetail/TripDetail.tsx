import Button from '@/components/Button'
import ButtonContainer from '@/components/ButtonContainer'
import Badge from '@/components/designSystem/Badge'
import RoundedImage from '@/components/designSystem/profile/RoundedImage'

import ArrowIcon from '@/components/icons/ArrowIcon'
import Calendar from '@/components/icons/Calendar'
import PersonIcon from '@/components/icons/PersonIcon'
import PlaceIcon from '@/components/icons/PlaceIcon'
import SearchFilterTag from '@/components/SearchFilterTag'
import Spacing from '@/components/Spacing'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
export default function TripDetail() {
  const {
    location,
    postStatus,
    userName,
    createdAt,
    title,
    details,
    tags,
    interestPerson,
    applyPerson,
    views,
    dueDate,
    maxPerson,
    genderType,
    isOwner,
    canApply,
    travelNumber
  } = tripDetailStore()
  // 일시적인 값
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'
  const minPerson = 1
  const isEditing = false
  const navigate = useNavigate()
  const [year, month, day] = dueDate.split('-')
  const DAY = new Date(`${year}/${month}/${day}`)
  const dayOfWeek = WEEKDAY[DAY.getDay()]
  const buttonClickHandler = () => {
    if (isOwner) {
      navigate(`/trip/enrollmentList/${travelNumber}`)
    }
  }
  return (
    <TripDetailWrapper>
      <PostWrapper>
        <MainContent>
          <BadgeContainer>
            <PlaceBadge>
              <PlaceIcon width={14} />
              <div>{location}</div>
            </PlaceBadge>
            <Badge
              isDueDate={false}
              text={'진행중'}
              height="22px"
              backgroundColor={palette.비강조4}
              color={palette.비강조}
              fontWeight="600"
            />
          </BadgeContainer>
          <ProfileContainer>
            {/* 프로필 */}
            <RoundedImage
              src={''}
              size={40}
            />
            <div css={{ marginLeft: '8px' }}>
              <UserName>{userName}</UserName>
              <div
                css={{
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '16.71px',
                  color: palette.비강조
                }}>
                {dayjs().diff(dayjs(createdAt, 'YYYY년MM월DD일'), 'day')}시간 전
              </div>
            </div>
          </ProfileContainer>
          {/* 제목  */}
          <Title>{title}</Title>
          {/* 내용 */}
          <Details>{details}</Details>
          {/*태그   */}
          <TagContainer>
            {tags.map((tag, idx) => (
              <Badge
                key={tag}
                isDueDate={false}
                text={tag}
                height="22px"
                backgroundColor={palette.비강조4}
                color={palette.비강조}
                fontWeight="500"
              />
            ))}
          </TagContainer>
        </MainContent>
        <ViewsETC>
          <div>신청 {applyPerson}</div>
          <div css={{ margin: '0px 4px' }}> · </div>
          <div>관심 {interestPerson}</div>
          <div css={{ margin: '0px 4px' }}> · </div>
          <div>조회수 {views}</div>
        </ViewsETC>
      </PostWrapper>
      <CommentWrapper>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/createTripBtn.png"
            alt=""
            css={{ marginRight: '13px' }}
          />
          <div
            css={{
              fontSize: '16px',
              fontWeight: '600',
              lineHeight: '14px'
            }}>
            멤버 댓글
          </div>
        </div>
        <div>
          <ArrowIcon stroke={palette.비강조3} />
        </div>
      </CommentWrapper>
      <DueDateWrapper>
        <div
          css={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <Calendar />
          <ContentTitle>모집 마감일</ContentTitle>
        </div>

        {/* 뱃지 추가 */}
        <div
          css={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <DueDate>
            {dueDate.replaceAll('-', '.')}({dayOfWeek})
          </DueDate>
          <Badge
            text={''}
            daysLeft={dayjs().diff(dayjs(dueDate, 'YYYY년MM월DD일'), 'day')}
          />
        </div>
      </DueDateWrapper>
      <PersonWrapper>
        <div css={{ display: 'flex' }}>
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '32px'
            }}>
            <PersonIcon
              width={20}
              height={20}
              stroke={palette.keycolor}
            />
            <ContentTitle>모집 인원</ContentTitle>
          </div>

          <div css={{ display: 'flex', alignItems: 'center' }}>
            <PersonStatus>
              {minPerson}/{maxPerson}
            </PersonStatus>
            <Badge
              isDueDate={false}
              text={genderType}
              backgroundColor={palette.검색창}
              color={palette.keycolor}
              fontWeight="600"
            />
          </div>
        </div>
        <ArrowIcon />
      </PersonWrapper>
      <Spacing size={100} />
      <BtnContainer
        onClick={buttonClickHandler}
        width={newRightPosition}>
        <Button
          addStyle={{
            backgroundColor: isOwner
              ? minPerson > 0
                ? palette.keycolor
                : palette.비강조3
              : canApply
                ? palette.keycolor
                : palette.keycolorBG,
            color: isOwner
              ? minPerson > 0
                ? palette.BG
                : palette.비강조
              : canApply
                ? palette.BG
                : palette.keycolor,
            fontWeight: '600'
          }}
          text={
            isOwner
              ? '참가신청목록'
              : canApply
                ? '참가신청하기'
                : '참가신청취소'
          }>
          {isOwner && minPerson > 0 && (
            <AppliedPersonCircle>{minPerson}</AppliedPersonCircle>
          )}
        </Button>
      </BtnContainer>
    </TripDetailWrapper>
  )
}
const AppliedPersonCircle = styled.div`
  background-color: ${palette.BG};
  color: ${palette.keycolor};
  width: 16px;
  height: 16px;
  padding: 1px 5px;
  gap: 10px;
  border-radius: 20px;
  opacity: 0px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PersonStatus = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: ${palette.기본};
  margin-right: 4px;
`
const BtnContainer = styled.div<{ width: string }>`
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
  margin-left: -24px;
  padding: 0 24px;
  z-index: 10;
`
const BadgeContainer = styled.div`
  display: flex;
`
const DueDate = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: ${palette.기본};
  margin-right: 8px;
`
const ProfileContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  margin-top: 32px;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.25px;
  text-align: left;
`
const Details = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: ${palette.기본};
`
const ContentTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 19.6px;
  text-align: left;
  color: ${palette.비강조};
  max-width: 63px;
  margin-left: 8px;
`
const TagContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
const TripDetailWrapper = styled.div`
  padding: 0px 24px;
  background-color: ${palette.검색창};
`
const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: ${palette.기본};
  margin-bottom: 4px;
`
const PostWrapper = styled.div`
  background-color: ${palette.BG};
  padding: 24px;

  top: 100px;
  left: 24px;
  gap: 32px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 3px rgba(170, 170, 170, 0.18);
`
const MainContent = styled.div``

const ViewsETC = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${palette.비강조4};
  padding-top: 16px;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${palette.비강조2};
`
const PlaceBadge = styled.div`
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.keycolorBG};
  color: ${palette.keycolor};
  font-size: 12px;
  font-weight: 600;
  line-height: 14.32px;
  text-align: left;
  height: 22px;
  padding: 4px 10px;
  gap: 4px;
  border-radius: 20px;
  opacity: 0px;
`
const CommentWrapper = styled.div`
  margin-top: 16px;
  height: 70px;
  display: flex;
  padding: 24px 0px 24px 16px;
  gap: 0px;
  border-radius: 20px;
  border-bottom: 1px solid ${palette.비강조5};
  justify-content: space-between;
  opacity: 0px;
  align-items: center;
  background-color: ${palette.BG};
`
const DueDateWrapper = styled.div`
  margin: 16px 0px;
  display: flex;
  background-color: ${palette.비강조5};
  height: 67px;
  top: 86px;
  padding: 24px 16px 21px 16px;
  border-radius: 20px;
  opacity: 0px;
  align-items: center;
`
const PersonWrapper = styled.div`
  display: flex;
  background-color: ${palette.비강조5};
  height: 67px;
  padding: 24px 0px 21px 16px;
  justify-content: space-between;
  border-radius: 20px;
  opacity: 0px;
  align-items: center;
`
