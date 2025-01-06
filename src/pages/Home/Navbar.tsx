import CommnunityIcon from '@/components/icons/CommnunityIcon'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import HomeIcon from '@/components/icons/HomeIcon'
import NavCommunityIcon from '@/components/icons/NavCommunityIcon'
import NavPersonIcon from '@/components/icons/NavPersonIcon'
import SearchIcon from '@/components/icons/SearchIcon'

import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import path from 'path'
import React, { MouseEventHandler, useState } from 'react'
import { NavLink, useLocation, useMatch, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()
  // const pages = ['/', '/search/travel', '/myTrip', '/community', '/mypage']
  const pages = [
    '/',
    '/trip/list',
    '/myTrip',
    '/community',
    '/myPage',
    '/myCommunity'
  ]
  const icons = [
    <HomeIcon
      width={20}
      height={20}
    />,
    <SearchIcon
      width={22}
      height={19}
    />,
    <EmptyHeartIcon
      width={22}
      height={20}
    />,
    <NavCommunityIcon />,
    <NavPersonIcon
      width={20}
      height={20}
    />
  ]
  const iconNames = ['홈', '여행 찾기', '내 여행', '커뮤니티', 'MY']

  const getIsActive = (page: string) => {
    if (
      page === '/myPage' &&
      (pathname === '/editMyInfo' ||
        pathname === '/announcement' ||
        pathname === '/requestedTrip')
    ) {
      return true
    }

    return pathname === page
  }
  const condition = () => {
    if (
      pathname === '/' ||
      pathname === '/myTrip' ||
      pathname === '/community' ||
      pathname === '/myPage' ||
      pathname === '/trip/list' ||
      pathname === '/editMyInfo' ||
      pathname === '/announcement' ||
      pathname === '/requestedTrip'
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
          const iconProps = {
            stroke: isLinkActive ? `${palette.기본}` : `${palette.비강조3}`,
            fill: isLinkActive ? `${palette.기본}` : 'none'
          }
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
              {React.cloneElement(Icon, iconProps)}

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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${palette.비강조5};
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
