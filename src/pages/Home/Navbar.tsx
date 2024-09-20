import CommnunityIcon from '@/components/icons/CommnunityIcon'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import PersonIcon from '@/components/icons/PersonIcon'
import SearchIcon from '@/components/icons/SearchIcon'

import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import path from 'path'
import { MouseEventHandler, useState } from 'react'
import { NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isHome, setIsHome] = useState(true)
  const [isTrip, setIsTrip] = useState(false)
  const [isBookmark, setIsBookmark] = useState(false)
  const [isCommnunity, setIsCommnunity] = useState(false)
  const [isMyPage, setIsMyPage] = useState(false)
  const navigate = useNavigate()

  const { pathname } = useLocation()
  const pages = ['/', '/search/travel', '/bookmark', '/community', '/mypage']
  const icons = [
    HomeIcon,
    SearchIcon,
    EmptyHeartIcon,
    CommnunityIcon,
    PersonIcon
  ]
  const iconNames = ['홈', '검색', '즐겨찾기', '커뮤니티', 'MY']

  const getIsActive = (page: string) => {
    return pathname === page
  }
  const condition = () => {
    if (
      pathname === '/' ||
      pathname === '/bookmark' ||
      pathname === '/community' ||
      pathname === '/mypage'
    )
      return true
    return false
  }
  return condition() ? (
    <Container>
      <Box>
        {pages.map((page, idx) => {
          const Icon = icons[idx]
          const isLinkActive = getIsActive(page)

          return (
            <NavLink
              key={page}
              to={page}
              css={{
                width: '49px',
                height: '48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Icon
                width={16}
                height={15.67}
                stroke={isLinkActive ? `${palette.기본}` : `${palette.비강조3}`}
                fill={isLinkActive ? `${palette.기본}` : 'none'}
              />
              <PageName
                color={isLinkActive ? `${palette.기본}` : `${palette.비강조3}`}>
                {iconNames[idx]}
              </PageName>
            </NavLink>
          )
        })}
      </Box>
    </Container>
  ) : null
}
export default Navbar

const Container = styled.div`
  height: 92px;
  @media (max-width: 440px) {
    width: 100%;
  }
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
    overflow-x: hidden;
  }
  position: fixed;
  bottom: 0;
  background-color: white;
  z-index: 1000;
  width: 100%;
  left: 0;
`
const PageName = styled.div<{ color: string }>`
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  width: 100%;
  margin-top: 8.45px;
  color: ${props => props.color};
`
const Box = styled.div`
  display: flex;
  margin-top: 12px;
  justify-content: space-evenly;
`
