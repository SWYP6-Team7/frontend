import ApplyTripProfile from '@/components/ApplyTripProfile'
import BoxLayoutTag from '@/components/BoxLayoutTag'
import Badge from '@/components/designSystem/Badge'
import CheckingModal from '@/components/designSystem/modal/CheckingModal'
import ResultModal from '@/components/designSystem/modal/ResultModal'
import RoundedImage from '@/components/designSystem/profile/RoundedImage'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import useEnrollment from '@/hooks/enrollment/useEnrollment'
import { authStore } from '@/store/client/authStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface enrollmentCardProps {
  enrollmentNumber: number
  userName: string
  ageGroup: string
  enrolledAt: string
  message: string
  isNew: boolean
}
export default function TripEnrollmentCard({
  enrollmentNumber,
  userName,
  ageGroup,
  enrolledAt,
  message,
  isNew
}: enrollmentCardProps) {
  const { travelNumber } = useParams<{ travelNumber: string }>()
  const { enrollmentAcceptanceMutate, enrollmentRejectionMutate } =
    useEnrollment(parseInt(travelNumber!))
  // 수락 모달
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [isAcceptBtnClicked, setIsAcceptBtnClicked] = useState(false)
  // 거절 모달
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
  const [isRejectBtnClicked, setIsRejecttBtnClicked] = useState(false)
  // 거절 완료 토스트 메시지
  const [isToastShow, setIsToastShow] = useState(false)
  // 수락 후 완료 모달
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  // 현재 주최자 인가!!!! 그거 조심.

  useEffect(() => {
    if (isAcceptBtnClicked) {
      // 수락 요청.

      enrollmentAcceptanceMutate(enrollmentNumber).then(res => {
        if (res?.status === 200) {
          setIsResultModalOpen(true)
        }
      })
    } else if (isRejectBtnClicked) {
      // 거절 요청
      enrollmentRejectionMutate(enrollmentNumber).then(res => {
        if (res?.status === 200) {
          setIsToastShow(true)
        }
      })
    }
  }, [isAcceptBtnClicked, isRejectBtnClicked])

  function getTimeAgo(dateString: string) {
    // 입력된 문자열을 Date 객체로 변환
    const inputDate = new Date(
      dateString.replace('.', '-').replace('.', '-') + ':00'
    )

    // 현재 시간 가져오기
    const now = new Date()

    // 밀리초 단위로 시간 차이 계산
    const diffInMilliseconds = now.getTime() - inputDate.getTime()

    // 초, 분, 시간, 일, 달, 년 계산
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))
    const diffInMonths = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
    )
    const diffInYears = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    )

    // 조건에 따라 '몇 분 전', '몇 시간 전', '몇 일 전', '몇 달 전', '몇 년 전'을 반환
    if (diffInMinutes < 1) {
      return '방금 전'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`
    } else if (diffInDays < 30) {
      return `${diffInDays}일 전`
    } else if (diffInMonths < 12) {
      return `${diffInMonths}개월 전`
    } else {
      return `${diffInYears}년 전`
    }
  }

  return (
    <Container>
      <UserBox>
        <Profile>
          <RoundedImage
            src={''}
            size={36}
          />
          <UserName>{userName}</UserName>
          {/* 뱃지. */}
          <Badge
            isDueDate={false}
            text={ageGroup}
            height={'22px'}
            color={palette.keycolor}
            backgroundColor={palette.keycolorBG}
          />
        </Profile>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <TimeAgo>{getTimeAgo(enrolledAt)}</TimeAgo>
          {/* 최신인가 아닌가 부분. */}
          {isNew && <NewMark></NewMark>}
        </div>
      </UserBox>
      <Msg>{message}</Msg>
      <BtnBox>
        <RejectBtn onClick={() => setIsRejectModalOpen(true)}>거절</RejectBtn>
        <AcceptBtn onClick={() => setIsAcceptModalOpen(true)}>수락</AcceptBtn>
      </BtnBox>
      <CheckingModal
        isModalOpen={isAcceptModalOpen}
        modalMsg={`정말 ${userName}의\n여행 참가를 수락하시겠어요?`}
        modalTitle="참가 수락"
        modalButtonText="수락하기"
        setIsSelected={setIsAcceptBtnClicked}
        setModalOpen={setIsAcceptModalOpen}
      />
      <CheckingModal
        isModalOpen={isRejectModalOpen}
        modalMsg={`정말 ${userName}님의\n여행 참가를 거절하시겠어요?`}
        modalTitle="참가 거절"
        modalButtonText="거절하기"
        setIsSelected={setIsRejecttBtnClicked}
        setModalOpen={setIsRejectModalOpen}
      />
      <ResultModal
        isModalOpen={isResultModalOpen}
        modalMsg={`${userName}님의 여행 참가 요청이 \n수락되었어요`}
        modalTitle="참가 수락 완료"
        setModalOpen={setIsResultModalOpen}
      />
      <ResultToast
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="여행 참가가 거절되었어요."
      />
    </Container>
  )
}
const Msg = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: ${palette.기본};
`
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  width: 100%;
`
const RejectBtn = styled.div`
  margin-right: 8px;
  width: 50%;
  height: 42px;
  padding: 10px 20px;
  gap: 10px;
  border-radius: 40px;
  opacity: 0px;
  background-color: #e7e7e7;
  color: ${palette.비강조};
  display: flex;
  align-items: center;
  justify-content: center;
`
const AcceptBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 42px;
  padding: 10px 20px;
  gap: 10px;
  border-radius: 40px;
  opacity: 0px;
  background-color: ${palette.keycolor};
  color: ${palette.비강조4};
`
const NewMark = styled.div`
  margin-left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${palette.like};
`
const TimeAgo = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: ${palette.비강조2};
`
const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
`
const Container = styled.div`
  padding: 24px;
  gap: 16px;
  border-radius: 20px;
  opacity: 0px;
  background-color: ${palette.검색창};
  margin-bottom: 16px;
`
const Profile = styled.div`
  display: flex;
  align-items: center;
`
const UserName = styled.div`
  margin-left: 8px;
  margin-right: 4px;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: left;
  color: ${palette.기본};
`
