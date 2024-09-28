import AlarmIcon from '@/components/icons/AlarmIcon'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import MoreIcon from '@/components/icons/MoreIcon'
import useTripDetail from '@/hooks/tripDetail/useTripDetail'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// 헤더부터 주최자인지에 따라 화면이 달라서, 헤더에서 여행 정보를 들고 오기.
export default function TripDetailHeader() {
  const { travelNumber } = useParams<{ travelNumber: string }>()
  const { tripDetail } = useTripDetail(parseInt(travelNumber!))
  console.log(tripDetail, '!!!!!!!!!!!!!!!!?')

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
    addApplyPerson,
    addCanApply,
    addInterestPerson,
    addIsOwner,
    addViews,
    addTravelNumber,
    isOwner
  } = tripDetailStore()

  const tripInfos = tripDetail.data?.data
  console.log(tripInfos, '데이터 맞쥬???')
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
        applyPerson,
        interestPerson,
        views,
        isOwner,
        canApply
      } = tripInfos
      addTravelNumber(travelNumber)
      addApplyPerson(applyPerson)
      addCanApply(canApply)
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
      addInterestPerson(interestPerson)
      addViews(views)
      addIsOwner(isOwner)
    }
  }, [tripDetail.isFetched])

  const alarmClickHandler = () => {
    console.log('알람 화면 이동.')
  }

  return (
    <Container isOwner={isOwner}>
      {isOwner && (
        <div onClick={alarmClickHandler}>
          <AlarmIcon
            size={23}
            stroke={palette.기본}
          />
        </div>
      )}
      <div>
        <EmptyHeartIcon
          width={22}
          stroke={palette.기본}
        />
      </div>

      {isOwner && (
        <div>
          <MoreIcon />
        </div>
      )}
    </Container>
  )
}
const Container = styled.div<{ isOwner: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: ${props => (props.isOwner ? '136px' : 'auto')};
`
