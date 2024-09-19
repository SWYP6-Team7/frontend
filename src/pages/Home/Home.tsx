import useAuth from '@/hooks/user/useAuth'
import useUser from '@/hooks/user/useUser'
import { authStore } from '@/store/client/authStore'
import { userStore } from '@/store/client/userStore'
import styled from '@emotion/styled'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeInputField from '@/components/designSystem/input/HomeInputField'
import AlarmIcon from '@/components/icons/AlarmIcon'
import ArrowIcon from '@/components/icons/ArrowIcon'
import { useBookmark } from '@/hooks/bookmark/useBookmark'
import Badge from '@/components/designSystem/Badge'
import BookmarkContainer from './BookmarkContainer'
import TripAvailable from './TripAvailable'
import TripRecommendation from './TripRecommendation'
import Spacing from '@/components/Spacing'
import Footer from './Footer'
import Navbar from './Navbar'
import CreateTripButton from './CreateTripButton'

const Home = () => {
  const { user } = useUser()
  const { name } = userStore()
  const { userId, accessToken } = authStore()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
  }
  // 로그인 먼저 해야 홈화면 접근 가능.
  // useEffect(() => {
  //   if (!userId || !accessToken) navigate('/login')
  // }, [])
  const [searchWord, setSearchWord] = useState('')
  const handleRemoveValue = () => setSearchWord('')
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value)
  }

  // 북마크 가져오기
  const { data } = useBookmark('1')
  const bookmarks = data?.data.bookMarks

  const onFocusHandler = () => navigate('/search/travel') // 검색화면으로 이동.

  function daysLeft(dateString: string) {
    // 오늘 날짜
    const today = new Date()

    // 주어진 날짜
    const targetDate = new Date(dateString)

    // 밀리초 단위로 차이 계산
    const timeDifference = targetDate.getTime() - today.getTime()

    // 밀리초를 일 수로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference
  }

  return (
    <HomeContainer>
      <HomeHeader>
        <HeaderTitle>
          <Text>홈</Text>
          <Alarm>
            <AlarmIcon />
          </Alarm>
        </HeaderTitle>
      </HomeHeader>
      <CharacterBox>
        <img
          src="/images/homeCharacter.png"
          alt=""
        />
      </CharacterBox>
      <ContentWrapper>
        <SearchBox>
          <Greeting>
            <span>{name}</span>님, 반가워요!
          </Greeting>

          <HomeInputField
            placeholder="어디로 여행을 떠날까요? ☁️ "
            onFocus={onFocusHandler}
          />
        </SearchBox>
        {/* 북마크 부분 */}
        <BookmarkContainer />
        {/* 참가 가능 여행 부분 */}
        <TripAvailable />
        {/* 추천 여행 부분 */}
        <TripRecommendation />
        <Spacing size={92} />
        <Footer />
      </ContentWrapper>
      <CreateTripButton />
    </HomeContainer>
  )
}
const HomeContainer = styled.div`
  background-color: #f0f0f0;
  width: 100%;
`

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0px 24px;
  background-color: white;
  min-height: calc(100svh - 68px - 30px);
  border-radius: 30px 30px 0px 0px;
`
const SearchBox = styled.div`
  background-color: white;
  padding-top: 40px;
`
const Greeting = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 30.8px;
  letter-spacing: -0.025em;
  text-align: left;
  margin-bottom: 8px;
  span {
    color: #3e8d01;
  }
`
const CharacterBox = styled.div`
  width: 100%;

  margin-top: 100px; // 헤더 길이 만큼 마진.
  height: 56px;
  overflow-y: hidden;
  padding-left: 63px;
`

const HomeHeader = styled.div`
  background-color: #f0f0f0;
  width: 100%;
  @media (max-width: 440px) {
    width: 100%;
  }
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
    overflow-x: hidden;
  }
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding-top: 40px;
  padding-left: 24px;
  padding-right: 24px;
`

const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`
const Text = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 28.64px;
  text-align: left;
`
const Alarm = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Home
