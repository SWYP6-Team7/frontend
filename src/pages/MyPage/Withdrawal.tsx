import Button from '@/components/designSystem/Buttons/Button'
import ButtonContainer from '@/components/ButtonContainer'
import CheckIcon from '@/components/icons/CheckIcon'
import Spacing from '@/components/Spacing'
import useMyPage from '@/hooks/myPage/useMyPage'
import { myPageStore } from '@/store/client/myPageStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Withdrawal() {
  const [isClicked, setIsClicked] = useState(false)
  const { withdrawMutation, isWithDrawError, isWithDrawSuccess } = useMyPage()
  const { name } = myPageStore()
  const navigate = useNavigate()
  const completeClickHandler = async () => {
    // 탈퇴 api 요청
    console.log('탈퇴')
    try {
      await withdrawMutation()
    } catch (e) {
      console.log(e, '탈퇴 오류 발생')
    }
  }

  useEffect(() => {
    if (isWithDrawSuccess) {
      console.log('탈퇴 성공!')
      navigate('/login')
    }
  }, [isWithDrawSuccess])

  useEffect(() => {
    if (isWithDrawError) {
      console.log('탈퇴 오류 발생')
    }
  }, [isWithDrawError])
  return (
    <Container>
      <TitleBox>
        <Text>
          {name}님, 정말 탈퇴하시겠어요?
          <br /> 너무 아쉬워요 🥺
        </Text>
        <SubText>회원 탈퇴 전에 꼭 확인하세요.</SubText>
      </TitleBox>
      <Spacing size={8} />
      <Line></Line>
      <Spacing size={8} />
      <Content>
        <li>
          회원 탈퇴 시, 해당 계정으로 저장된 항목은 모두 삭제되며 복구가
          불가능합니다.
        </li>
        <li>
          회원 탈퇴 후, 3개월 내에 동일한 이메일 계정으로 재가입이 불가능합니다.
        </li>
      </Content>
      <Spacing size={8} />
      <Line></Line>
      <Spacing size={8} />
      <Bye>
        <div>
          그동안 모잉과 함께해 주셔서 감사합니다.
          <br /> 다시 만날 수 있기를 언제나 기다리고 있을게요.
        </div>
      </Bye>
      <ButtonContainer isWithdrawal={true}>
        <TermContainer>
          <button onClick={() => setIsClicked(true)}>
            {isClicked ? (
              <CheckIcon
                status="done"
                size={18}
              />
            ) : (
              <CheckIcon size={18} />
            )}
          </button>
          <TermTitle>네, 탈퇴하겠습니다.</TermTitle>
        </TermContainer>
        <Button
          disabled={!isClicked}
          text="탈퇴하기"
          onClick={completeClickHandler}
          addStyle={{
            backgroundColor: isClicked
              ? 'rgba(62, 141, 0, 1)'
              : 'rgba(220, 220, 220, 1)',
            color: isClicked ? 'rgba(240, 240, 240, 1)' : palette.비강조,
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonContainer>
    </Container>
  )
}
const TermTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  flex: 1;
  line-height: 16px;
`
const TermContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`
const Line = styled.div`
  height: 1px;
  border-bottom: 1px solid rgba(231, 231, 231, 1);
`
const Container = styled.div`
  margin-top: 24px;
  padding: 0px 24px;
`
const TitleBox = styled.div`
  padding: 10px 0px;
  gap: 10px;
  opacity: 0px;
`
const Text = styled.div`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  text-align: left;
  color: ${palette.기본};
`
const SubText = styled.div`
  margin-top: 10px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: left;
  color: ${palette.비강조2};
`
const Content = styled.div`
  padding: 10px 0px;
  gap: 10px;
  opacity: 0px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;

  text-align: left;
`
const Bye = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.025em;
  text-align: left;
  padding: 10px 0px;
  gap: 10px;
  opacity: 0px;
`
