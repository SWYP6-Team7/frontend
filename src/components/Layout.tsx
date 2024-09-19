import styled from '@emotion/styled'
import React from 'react'
import Header from './Header'
import { Outlet, useMatch, useLocation } from 'react-router-dom'
import Navbar from '@/pages/Home/Navbar'
import { authStore } from '@/store/client/authStore'
import path from 'path'
const Layout = () => {
  const { pathname } = useLocation()
  const isAuth = pathname.startsWith('/register') || pathname === '/login'
  const { userId, accessToken } = authStore()

  return (
    <Container>
      <Body
        pathname={pathname}
        isAuth={isAuth}>
        {/* {isSignup && <Header />} */}
        {/* 홈 화면 헤더는 다른 형태. */}
        {pathname !== '/' && pathname !== '/login' && <Header />}

        <Outlet />
        {/* 로그인을 해야만 보이는거 처리. */}
        {(userId || pathname === '/') && <Navbar />}
      </Body>
    </Container>
  )
}

// 대중적인 mobile device는 430px 미만
// 그렇기 때문에 440px 이상이면 모바일 환경이 아니라고 생각하고 max-width를 figma layout에 맞춤
const Body = styled.div<{ isAuth: boolean; pathname: string }>`
  width: 100svw;
  height: 100%;
  position: relative;
  background-color: ${props =>
    props.pathname === '' ? '#f0f0f0' : props.isAuth ? '#fffff6' : '#fdfdfd'};
  /* background-color: #fffff6; */
  @media (max-width: 440px) {
    width: 100svw;
  }
  @media (min-width: 440px) {
    width: 390px;
    overflow-x: hidden;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`
// pc환경에서 화면을 가운데 정렬하기 위한 레이아웃 스타일
const Container = styled.div`
  height: 100svh;
  width: 100svw;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Layout
