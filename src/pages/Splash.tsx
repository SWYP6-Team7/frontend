import MoingFullLogo from '@/components/icons/MoingFullLogo'
import { authStore } from '@/store/client/authStore'
import { splashOnStore } from '@/store/client/splashOnOffStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const { splashOn, addSplashOn } = splashOnStore()
  const { accessToken } = authStore()
  const navigate = useNavigate()
  useEffect(() => {
    const revisit = sessionStorage.getItem('revisit')

    if (revisit === undefined || revisit === null) {
      setTimeout(() => {
        addSplashOn(false)
      }, 2000)
      sessionStorage.setItem('revisit', 'true')
    } else if (revisit === 'true') {
      addSplashOn(false)
    }
  }, [])
  useEffect(() => {
    if (splashOn === false) {
      console.log('스플래쉬 닫힘')
      if (!accessToken) {
        navigate('/onBoarding')
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
