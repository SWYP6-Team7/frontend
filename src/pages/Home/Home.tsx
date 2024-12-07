import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeInputField from '@/components/designSystem/input/HomeInputField'
import AlarmIcon from '@/components/icons/AlarmIcon'
import BookmarkContainer from './BookmarkContainer'
import TripAvailable from './TripAvailable'
import TripRecommendation from './TripRecommendation'
import Spacing from '@/components/Spacing'
import Footer from './Footer'
import CreateTripButton from './CreateTripButton'
import { palette } from '@/styles/palette'
import { myPageStore } from '@/store/client/myPageStore'
import { useBackPathStore } from '@/store/client/backPathStore'

const Home = () => {
  const { name } = myPageStore()
  const { setSearchTravel, setNotification } = useBackPathStore()
  const navigate = useNavigate()

  const onFocusHandler = () => {
    setSearchTravel('/')
    navigate('/search/travel')
  } // 검색화면으로 이동.

  // 이 부분 추후 유저 id로 대채해야함
  const onClickAlarm = () => {
    setNotification('/')
    navigate(`/notification`)
  }

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 56)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <HomeContainer>
      <HomeHeader scrolled={scrolled}>
        <HeaderTitle>
          <img
            src={'/images/homeLogo.png'}
            width={96}
            height={24}
            alt="홈 모잉의 로고입니다"
          />
          <Alarm onClick={onClickAlarm}>
            <AlarmIcon />
          </Alarm>
        </HeaderTitle>
      </HomeHeader>

      {/* <CharacterBox>
        <img
          src="/images/homeCharacter.png"
          alt=""
        />
      </CharacterBox> */}
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
  background-color: ${palette.검색창};
  width: 100%;
`

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0px 24px;
`
const SearchBox = styled.div`
  padding-top: 16px;
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

const HomeHeader = styled.div<{ scrolled: boolean }>`
  background-color: ${palette.검색창};
  display: flex;
  align-items: center;
  height: 116px;
  position: sticky;
  top: 0;
  justify-content: space-between;
  z-index: 1000;
  padding-top: 52px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 16px;
`

const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  width: 100%;
`
const Alarm = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default Home
