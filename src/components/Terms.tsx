import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WhiteXIcon from './icons/WhiteXIcon'
import { keyframes } from '@emotion/react'
import Spacing from './Spacing'
import CheckIcon from './icons/CheckIcon'
import Button from './Button'
import { palette } from '@/styles/palette'
import ResultToast from './designSystem/toastMessage/resultToast'

interface TermsProps {
  closeShowTerms: () => void
}

const Terms = ({ closeShowTerms }: TermsProps) => {
  const [check, setCheck] = useState({
    service: true,
    privacy: true
  })
  const [isToastShow, setIsToastShow] = useState(false)
  const navigate = useNavigate()
  const handleBackButton = () => {
    navigate('/login')
  }

  const handleCheck = (item: 'privacy' | 'service') => {
    if (check[item]) {
      setIsToastShow(true)
    }
    setCheck(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }
  return (
    <Container>
      <BackButotn onClick={handleBackButton}>
        <WhiteXIcon />
      </BackButotn>
      <TermsContainer>
        <Title>
          모잉을 이용하기 위해
          <br />
          <GreenText>동의</GreenText>가 필요해요.
        </Title>

        <Bar />
        <TermContainer>
          <button onClick={() => handleCheck('service')}>
            {check.service ? (
              <CheckIcon
                status="done"
                size={18}
              />
            ) : (
              <CheckIcon size={18} />
            )}
          </button>
          <TermTitle>(필수) 서비스 이용 약관</TermTitle>
          <a
            href="/pdf/service_terms(241115).pdf"
            target="_blank">
            <TermMore>보기</TermMore>
          </a>
        </TermContainer>
        <Spacing size={24} />
        <TermContainer>
          <button onClick={() => handleCheck('privacy')}>
            {check.privacy ? (
              <CheckIcon
                status="done"
                size={18}
              />
            ) : (
              <CheckIcon size={18} />
            )}
          </button>
          <TermTitle>(필수) 개인정보 수집, 이용 동의</TermTitle>
          <a
            href="/pdf/privacy_terms(241006).pdf"
            target="_blank">
            <TermMore>보기</TermMore>
          </a>
        </TermContainer>
        <Spacing size={111} />
        {check.privacy && check.service ? (
          <Button
            text="동의합니다"
            onClick={closeShowTerms}
          />
        ) : (
          <Button
            text="동의합니다"
            disabled
            addStyle={{
              backgroundColor: 'rgba(220, 220, 220, 1)',
              color: 'rgba(132, 132, 132, 1)',
              boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
            }}
          />
        )}
        <Spacing size={40} />
      </TermsContainer>
      <ResultToast
        bottom="80px"
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="필수 항목은 반드시 동의해야 해요."
      />
    </Container>
  )
}

const Bar = styled.div`
  height: 1px;
  width: 100%;
  margin: 30px 0;
  background-color: rgba(205, 205, 205, 1);
`

const Container = styled.div`
  height: 100svh;
  position: fixed;
  z-index: 9999;
  width: 100%;
  top: 0;
  left: 0;

  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }

  background-color: rgba(0, 0, 0, 0.6);
`

const BackButotn = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
`
const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(9);
    opacity: 1;
  }
`

const TermsContainer = styled.div`
  width: 100%;
  bottom: 0;

  @media (min-width: 440px) {
    width: 390px;
  }
  position: absolute;
  padding: 0 30px;

  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;

  padding-top: 48px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  background-color: white;
  animation: ${slideUp} 0.5s ease-out forwards;
`

const GreenText = styled.span`
  color: ${palette.keycolor};
`

const Title = styled.h2`
  font-size: 24px;
  letter-spacing: -0.04px;
  font-weight: 600;
`

const AllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const AllText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const AllTitle = styled.h4`
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.04px;
`

const TermTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  line-height: 16px;
`

const TermMore = styled.div`
  color: rgba(171, 171, 171, 1);

  font-size: 14px;
  font-weight: 500;
  line-height: 16px;

  text-decoration: underline;
`

const AllDescription = styled.div`
  font-size: 14px;
  letter-spacing: -0.04px;
  color: rgba(171, 171, 171, 1);
`

const TermContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

export default Terms
