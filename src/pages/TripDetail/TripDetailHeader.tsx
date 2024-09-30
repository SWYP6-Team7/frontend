import EditAndDeleteModal from '@/components/designSystem/modal/EditAndDeleteModal'
import AlarmIcon from '@/components/icons/AlarmIcon'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import MoreIcon from '@/components/icons/MoreIcon'
import useTripDetail from '@/hooks/tripDetail/useTripDetail'
import { authStore } from '@/store/client/authStore'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// 헤더부터 주최자인지에 따라 화면이 달라서, 헤더에서 여행 정보를 들고 오기.
export default function TripDetailHeader() {
  const { userId, accessToken } = authStore()
  const { travelNumber } = useParams<{ travelNumber: string }>()
  const { tripDetail } = useTripDetail(parseInt(travelNumber!))
  const navigate = useNavigate()
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)

  useEffect(() => {}, [])
  const {
    addLocation,
    addUserName,
    addUserNumber,
    addCreatedAt,
    addTitle,
    addDetails,
    addMaxPerson,
    addGenderType,
    addDueDate,
    addPeriodType,
    addTags,
    addPostStatus,
    addNowPerson,
    addEnrollCount,
    addBookmarkCount,
    addHostUserCheck,
    addViewCount,
    addTravelNumber,
    addEnrollmentNumber,
    hostUserCheck,
    addAgeGroup
  } = tripDetailStore()

  const tripInfos = tripDetail.data?.data

  useEffect(() => {
    if (tripDetail.isFetched) {
      const {
        travelNumber,
        userNumber,
        userName,
        createdAt,
        location,
        title,
        details,
        maxPerson,
        genderType,
        dueDate,
        periodType,
        tags,
        postStatus,
        nowPerson,
        bookmarkCount,
        viewCount,
        hostUserCheck,
        enrollmentNumber,
        enrollCount,
        ageGroup
      } = tripInfos
      addTravelNumber(travelNumber)
      addEnrollmentNumber(enrollmentNumber)
      addEnrollCount(enrollCount)
      addCreatedAt(createdAt)
      addUserNumber(userNumber)
      addUserName(userName)
      addLocation(location)
      addTitle(title)
      addDetails(details)
      addMaxPerson(maxPerson)
      addGenderType(genderType)
      addDueDate(dueDate)
      addPeriodType(periodType)
      addTags(tags)
      addPostStatus(postStatus)
      addBookmarkCount(bookmarkCount)
      addViewCount(viewCount)
      addHostUserCheck(hostUserCheck)
      addNowPerson(nowPerson)
      addAgeGroup(ageGroup)
    }
  }, [tripDetail.isFetched])

  return (
    <Container hostUserCheck={hostUserCheck}>
      {hostUserCheck && (
        <div onClick={() => navigate(`notification/${userId}`)}>
          <AlarmIcon
            size={23}
            stroke={palette.기본}
          />
        </div>
      )}
      <div onClick={() => navigate('/bookmark')}>
        <EmptyHeartIcon
          width={22}
          stroke={palette.기본}
        />
      </div>

      {hostUserCheck && (
        <div onClick={() => setIsEditBtnClicked(true)}>
          <MoreIcon />
        </div>
      )}
      <EditAndDeleteModal
        isOpen={isEditBtnClicked}
        setIsOpen={setIsEditBtnClicked}
      />
    </Container>
  )
}
const Container = styled.div<{ hostUserCheck: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${props => (props.hostUserCheck ? '136px' : 'auto')};
`
