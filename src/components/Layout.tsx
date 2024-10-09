import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import Header from './Header'
import {
  Outlet,
  useMatch,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom'
import Navbar from '@/pages/Home/Navbar'
import { authStore } from '@/store/client/authStore'
import path from 'path'
import { palette } from '@/styles/palette'
import useAuth from '@/hooks/user/useAuth'
import { myPageStore } from '@/store/client/myPageStore'
import useMyPage from '@/hooks/myPage/useMyPage'
import { ImyPage } from '@/model/myPages'
const Layout = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { userPostRefreshToken } = useAuth()
  const { userId, accessToken, logoutCheck } = authStore()
  // 유저 프로필 정보 불러오기
  const { addEmail, addName, addGender, addAgegroup, addPreferredTags } =
    myPageStore()

  const { data, isLoading } = useMyPage()
  const isOnboarding = pathname.startsWith('/onBoardingOne')
  const myPageData: ImyPage = data?.data

  useEffect(() => {
    if (!isLoading && myPageData) {
      addName(myPageData.name)
      addAgegroup(myPageData.ageGroup)
      addEmail(myPageData.email)
      addPreferredTags(myPageData.preferredTags)
      addGender(myPageData.gender)
    }
  }, [isLoading]) // 새로고침 시, 토큰이 다시 생겼을 때 정보 할당히 가능하도록.

  const noNeedPages = [
    '/login',
    '/registerForm',
    '/registerName',
    '/registerAge',
    '/registerAge/registerGender',
    '/registerTripStyle',
    '/onBoardingOne'
  ]
  const isAccessTokenNoNeedpages = (path: string) => {
    // 필요없는 페이지 인지 확인하는 함수.
    return noNeedPages.some(url => url === path)
  }
  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 토큰 갱신 시도(새로고침시 토큰 사라지는 문제해결 위해)
    if (!accessToken && !logoutCheck) {
      // 토큰이 없으면 리프레쉬 토큰 api 요청.
      const refreshAccessToken = async () => {
        try {
          // refresh 토큰을 이용해 accessToken 재발급 요청
          await userPostRefreshToken()
        } catch (error) {
          console.error('Failed to refresh token:', error)
          navigate('/login') // 로그인 이동.
        }
      }

      if (!isAccessTokenNoNeedpages(pathname)) {
        refreshAccessToken()
      }
    }
  }, [accessToken])
  console.log(userId, accessToken, '토큰')
  return (
    <Container pathname={pathname}>
      <Body pathname={pathname}>
        {/* {isSignup && <Header />} */}
        {/* 홈 화면 헤더는 다른 형태. */}
        {pathname !== '/' &&
          !isOnboarding &&
          pathname !== '/registerDone' &&
          pathname !== '/login' &&
          pathname !== '/trip/list' && <Header />}
        <Outlet />
        {/* {accessToken || isAccessTokenNoNeedpages(pathname) ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )} */}

        {/* 로그인을 해야만 보이는거 처리. */}
        <Navbar />
      </Body>
    </Container>
  )
}

// 대중적인 mobile device는 430px 미만
// 그렇기 때문에 440px 이상이면 모바일 환경이 아니라고 생각하고 max-width를 figma layout에 맞춤
const Body = styled.div<{ pathname: string }>`
  width: 100svw;
  height: 100%;
  position: relative;

  background-color: ${props =>
    props.pathname === '/'
      ? '#f0f0f0'
      : props.pathname.startsWith('/trip/detail') ||
          props.pathname.startsWith('/myTrip')
        ? `${palette.검색창}`
        : `${palette.BG}`};

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
const Container = styled.div<{ pathname: string }>`
  /* height는 홈화면 스크롤을 보기 위해서 auto로 잡아두기. width는 가로스크롤이 생겨서 auto로. */
  height: ${props => (props.pathname !== '/' ? '100svh' : 'auto')};
  width: ${props => (props.pathname !== '/' ? '100svw' : 'auto')};

  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`

export default Layout
