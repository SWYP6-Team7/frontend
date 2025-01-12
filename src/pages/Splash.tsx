'use client'
import MoingFullLogo from '@/components/icons/MoingFullLogo'
import { authStore } from '@/store/client/authStore'
import { splashOnStore } from '@/store/client/splashOnOffStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

export default function Splash() {
  const { splashOn, addSplashOn } = splashOnStore()

  const { accessToken } = authStore()
  const router = useRouter()

  const backGroundGrey = ['/trip/detail', '/', 'myTrip', '/splash']
  useEffect(() => {
    const revisit =
      typeof window !== 'undefined' ? sessionStorage.getItem('revisit') : null

    if (revisit === undefined || revisit === null) {
      setTimeout(() => {
        // if (isMobile) window.location.reload()

        let themeColorMetaTag = document.querySelector(
          'meta[name="theme-color"]'
        )
        if (themeColorMetaTag) {
          themeColorMetaTag.setAttribute('content', '#F5F5F5')
        }

        addSplashOn(false)
      }, 2000)
      sessionStorage.setItem('revisit', 'true')
    } else if (revisit === 'true') {
      addSplashOn(false)
    }
  }, [])
  useEffect(() => {
    const revisit =
      typeof window !== 'undefined' ? sessionStorage.getItem('revisit') : null
    if (splashOn === false && revisit !== 'true') {
      // 스플래쉬 닫혔고, 방문한 적이 없다면, 온보딩으로.
      console.log('스플래쉬 닫힘')
      if (!accessToken) {
        router.replace('/onBoarding')
      }
    }
  }, [splashOn])

  return (
    <Container splashOn={splashOn}>
      <LogoContainer>
        <MoingFullLogo />
      </LogoContainer>
    </Container>
  )
}

const Container = styled.div<{ splashOn: boolean }>`
  /* display: ${props => (props.splashOn ? 'block' : 'none')}; */
  padding-top: env(safe-area-inset-top);

  position: absolute;
  z-index: 2500;
  height: 100svh;
  /* width: 100%; */
  top: 0;
  opacity: ${({ splashOn }) => (splashOn ? 1 : 0)};
  transition: opacity 200ms ease-in-out;
  pointer-events: ${({ splashOn }) => (splashOn ? 'auto' : 'none')};
  background-color: ${palette.keycolor};
  @media (max-width: 440px) {
    width: 100svw;
  }
  @media (min-width: 440px) {
    width: 390px;
    overflow-x: hidden;
  }
`
const LogoContainer = styled.div`
  display: flex;
  height: 100svh;
  justify-content: center;
  align-items: center;
`
