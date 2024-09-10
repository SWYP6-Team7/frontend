import styled from '@emotion/styled'
import React from 'react'
import BackIcon from './icons/BackIcon'
import { useMatch, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignup = useMatch('/signup')
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <HeaderContainer>
      <ButotnContainer onClick={handleBack}>
        <BackIcon />
      </ButotnContainer>

      <Title>회원가입</Title>
      {location.pathname == '/registerTripStyle' && (
        <Skip onClick={() => navigate('/')}>건너뛰기</Skip>
      )}
      {location.pathname != '/registerTripStyle' && <VoidArea />}
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
