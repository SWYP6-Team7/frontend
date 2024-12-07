import styled from '@emotion/styled'
import BackIcon from './icons/BackIcon'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import TripDetailHeader from '@/pages/TripDetail/TripDetailHeader'
import AlarmIcon from './icons/AlarmIcon'
import { palette } from '@/styles/palette'

import CommunityHeader from './community/CommunityHeader'
import { useHeaderNavigation } from '@/hooks/useHeaderNavigation'
import { useBackPathStore } from '@/store/client/backPathStore'

const Header = () => {
  const {
    getPageTitle,
    shouldShowAlarmIcon,
    shouldShowSkip,
    ROUTES,
    checkRoute,
    handleBack
  } = useHeaderNavigation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setNotification } = useBackPathStore()
  const handleNotification = () => {
    setNotification(
      checkRoute.exact(ROUTES.MY.PAGE) ? ROUTES.MY.PAGE : ROUTES.MY.TRIP
    )
    navigate('/notification')
  }

  return (
    <HeaderContainer>
      {!shouldShowAlarmIcon() && (
        <>
          <ButtonContainer onClick={handleBack}>
            <BackIcon />
          </ButtonContainer>
          {(checkRoute.startsWith(ROUTES.TRIP.DETAIL) ||
            checkRoute.startsWith(ROUTES.COMMUNITY.DETAIL)) &&
            searchParams.get('share') === 'true' && (
              <Link
                to="/"
                style={{ marginLeft: 14 }}>
                <img
                  src={'/images/homeLogo.png'}
                  width={96}
                  height={24}
                  alt="홈 모잉의 로고입니다"
                />
              </Link>
            )}
        </>
      )}

      <Title>{getPageTitle()}</Title>
      {shouldShowSkip() && <Skip onClick={() => navigate('/')}>건너뛰기</Skip>}
      {!checkRoute.exact(ROUTES.REGISTER_PROCESS.TRIP_STYLE) && <VoidArea />}
      {checkRoute.startsWith(ROUTES.TRIP.DETAIL) && <TripDetailHeader />}
      {checkRoute.startsWith(ROUTES.COMMUNITY.DETAIL) && <CommunityHeader />}
      {shouldShowAlarmIcon() && (
        <div onClick={handleNotification}>
          <AlarmIcon
            size={23}
            stroke={palette.기본}
          />
        </div>
      )}
    </HeaderContainer>
  )
}

// button에 cursor pointer 추가
const ButtonContainer = styled.button`
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
