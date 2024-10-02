import styled from '@emotion/styled'
import React from 'react'
import BackIcon from './icons/BackIcon'
import { useMatch, useNavigate, useLocation } from 'react-router-dom'
import TripDetailHeader from '@/pages/TripDetail/TripDetailHeader'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isRegister = location.pathname.startsWith('/register')
  const isCreateTrip = location.pathname.startsWith('/createTrip')
  const isSearch = location.pathname === '/search/travel'
  const isTripDetail = location.pathname.startsWith('/trip/detail')
  const isTripEnrollment = location.pathname.startsWith('/trip/enrollmentList')
  const isNotification = location.pathname.startsWith('/notification')
  const isApply = location.pathname.startsWith('/trip/apply')
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <HeaderContainer>
      <ButotnContainer onClick={handleBack}>
        <BackIcon />
      </ButotnContainer>

      <Title>
        {isRegister && '회원가입'}
        {isSearch && '여행찾기'}
        {isCreateTrip && '여행 만들기'}
        {isApply && '참가 신청'}
        {isTripEnrollment && '참가 신청 목록'}

        {isNotification && '알림'}
      </Title>
      {location.pathname == '/registerTripStyle' && (
        <Skip onClick={() => navigate('/')}>건너뛰기</Skip>
      )}
      {location.pathname != '/registerTripStyle' && <VoidArea />}
      {isTripDetail && <TripDetailHeader />}
    </HeaderContainer>
  )
}

// button에 cursor pointer 추가
const ButotnContainer = styled.button`
  cursor: pointer;
`

// header container
// 상단 헤더 스타일
const HeaderContainer = styled.header`
  width: 100%;
  height: 68px;
  padding: 20px 24px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px; // 헤더 높이 100px.
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 23.87px;
`

// 레이아웃을 맞추기 위한 빈 공간 할당
const VoidArea = styled.div`
  size: 24px;
`
// skip
const Skip = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(155, 155, 155, 1);
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`
export default Header
