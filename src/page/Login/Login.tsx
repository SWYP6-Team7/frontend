'use client'
import { googleLogin, kakaoLogin, naverLogin } from '@/api/user'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import NaverIcon from '@/components/icons/NaverIcon'
import EmailLoginForm from '@/components/login/EmailLoginForm'
import Spacing from '@/components/Spacing'
import styled from '@emotion/styled'

const Login = () => {
  const handleSimpleLogin = async (domain: 'naver' | 'kakao' | 'google') => {
    switch (domain) {
      case 'naver':
        await naverLogin()
        return
      case 'kakao':
        await kakaoLogin()
        return
      case 'google':
        await googleLogin()
    }
  }

  return (
    <Container>
      <TopArea>
        <img
          src={'/images/loginLogo2.png'}
          alt="모잉 서비스의 로고 이미지입니다."
          width={128}
          height={89}
        />
      </TopArea>
      <EmailLoginForm />
      <BottomArea>
        <Spacing size="2.3svh" />
        <LoginIconContainer>
          <Button onClick={() => handleSimpleLogin('naver')}>
            <NaverIcon />
          </Button>

          <Button onClick={() => handleSimpleLogin('kakao')}>
            <KakaoIcon />
          </Button>
          <Button onClick={() => handleSimpleLogin('google')}>
            <GoogleIcon />
          </Button>
        </LoginIconContainer>
      </BottomArea>
    </Container>
  )
}

const Button = styled.button`
  cursor: pointer;
`

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TopArea = styled.div`
  display: flex;

  justify-content: end;
  align-items: center;
  gap: 16px;
  flex-direction: column;
  padding-bottom: 7.7svh;
`

const BottomArea = styled.div`
  padding: 0 24px;

  padding-top: 6.3svh;

  display: flex;
  align-items: end;
  width: 100%;
  flex-direction: column;
  color: rgba(132, 132, 132, 1);
  font-size: 14px;
  line-height: 16.71px;
`

const LoginIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
`

export default Login
