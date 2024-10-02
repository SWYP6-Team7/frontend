import CheckingModal from '@/components/designSystem/modal/CheckingModal'
import ResultModal from '@/components/designSystem/modal/ResultModal'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import useEnrollment from '@/hooks/enrollment/useEnrollment'
import useAuth from '@/hooks/user/useAuth'

import { authStore } from '@/store/client/authStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TripEnrollmentCard from './TripEnrollmentCard'

interface enrollment {
  enrollmentNumber: number
  userName: string
  userAgeGroup: string
  enrolledAt: string
  message: string
  status: string
}
export default function TripEnrollmentList() {
  const { travelNumber } = useParams<{ travelNumber: string }>()
  const { enrollmentList } = useEnrollment(parseInt(travelNumber!))

  const list = enrollmentList.data?.data
  // const lastViewTime = enrollmentsLastViewed.data?.data
  console.log(list)

  const isNew = (dateString: string) => {
    // 문자열을 Date 객체로 변환
    const inputDate = new Date(dateString.replace('.', '-').replace('.', '-'))

    // 현재 시간을 가져옴
    const currentDate = new Date()

    // 주어진 날짜가 현재 시간보다 이전인지 확인
    return inputDate < currentDate
  }
  function getCurrentFormattedDate() {
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // 0부터 시작하므로 +1
    const day = String(now.getDate()).padStart(2, '0')

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${year}.${month}.${day} ${hours}:${minutes}`
  }
  useEffect(() => {
    //최근 열람 시간 업데이트.
    // updateLastViewed(getCurrentFormattedDate())
  }, [])
  return (
    <Container>
      {list && (
        <>
          <Count>
            총
            <p css={{ marginLeft: '4px', color: palette.keycolor }}>
              {!list.totalCount ? 0 : list.totalCount}
            </p>
            건
          </Count>
          <div css={{ marginTop: '16px' }}>
            {list.enrollments?.map((enrollment: enrollment) => (
              <TripEnrollmentCard
                key={enrollment.enrollmentNumber}
                isNew={false}
                // isNew={isNew(lastViewTime)}
                enrollmentNumber={enrollment.enrollmentNumber}
                userName={enrollment.userName}
                ageGroup={enrollment.userAgeGroup}
                enrolledAt={enrollment.enrolledAt}
                message={enrollment.message}
              />
            ))}
          </div>
        </>
      )}
      <div></div>
    </Container>
  )
}

const Container = styled.div`
  padding: 0px 24px;
`
const Count = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
`
