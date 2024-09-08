import styled from '@emotion/styled'
import React from 'react'
import BackIcon from './icons/BackIcon'
import { Link, useMatch, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
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
      <VoidArea />
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

export default Header
