import InputField from '@/components/designSystem/input/InputField'
import InfoText from '@/components/designSystem/text/InfoText'
import GoogleIcon from '@/components/icons/GoogleIcon'
import KakaoIcon from '@/components/icons/KakaoIcon'
import NaverIcon from '@/components/icons/NaverIcon'
import EmailLoginForm from '@/components/login/EmailLoginForm'
import Spacing from '@/components/Spacing'
import { GOOGLE_LINK, KAKAO_LINK, NAVER_AUTH_URL } from '@/utils/constants'
import styled from '@emotion/styled'

const Login = () => {
  const handleSimpleLogin = (domain: 'naver' | 'kakao' | 'google') => {
    switch (domain) {
      case 'naver':
        window.location.href = NAVER_AUTH_URL
        return
      case 'kakao':
        window.location.href = KAKAO_LINK
        return
      case 'google':
        window.location.href = GOOGLE_LINK
    }
  }

  return (
    <Container>
      <TopArea>
        <img
          css={{ marginTop: '100%' }}
          src={'/images/moing-logo.png'}
          alt="모잉 서비스의 로고 이미지입니다."
          width={80}
          height={82}
        />
        <Title>MOING</Title>
      </TopArea>
      <EmailLoginForm />
      <BottomArea>
        <SimpleLoginText>
          <Bar />
          <span>간편 로그인</span>
          <Bar />
        </SimpleLoginText>
        <Spacing size="2.3svh" />
        <LoginIconContainer>
          <button onClick={() => handleSimpleLogin('naver')}>
            <NaverIcon />
          </button>

          <button onClick={() => handleSimpleLogin('kakao')}>
            <KakaoIcon />
          </button>
          <button onClick={() => handleSimpleLogin('google')}>
            <GoogleIcon />
          </button>
        </LoginIconContainer>
      </BottomArea>
    </Container>
  )
}

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  font-family: 'Mitr', sans-serif;
`

const Container = styled.div`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TopArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
  flex-direction: column;
  padding-bottom: 7.7svh;
`

const BottomArea = styled.div`
  padding: 0 24px;

  padding-top: 6.3svh;
  flex: 1;
  display: flex;
  align-items: end;
  width: 100%;
  flex-direction: column;
  color: rgba(132, 132, 132, 1);
  font-size: 14px;
  line-height: 16.71px;
`

const SimpleLoginText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 17px;
`
const Bar = styled.div`
  background-color: rgba(232, 232, 232, 1);
  height: 1px;

  flex: 1;
`

const LoginIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24px;
`

export default Login
