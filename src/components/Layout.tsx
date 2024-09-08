import styled from '@emotion/styled'
import React from 'react'
import Header from './Header'
import { Outlet, useMatch } from 'react-router-dom'
const Layout = () => {
  const isSignup = useMatch('/signup')
  return (
    <Container>
      <Body>
        {isSignup && <Header />}
        <Outlet />
      </Body>
    </Container>
  )
}

// 대중적인 mobile device는 430px 미만
// 그렇기 때문에 440px 이상이면 모바일 환경이 아니라고 생각하고 max-width를 figma layout에 맞춤
const Body = styled.div`
  width: 100svw;
  height: 100%;

  background-color: #fffff6;
  @media (min-width: 440px) {
    max-width: 390px;
  }
`
// pc환경에서 화면을 가운데 정렬하기 위한 레이아웃 스타일
const Container = styled.div`
  height: 100svh;
  width: 100sv;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Layout
