import ThirdStepIcon from '@/components/icons/ThirdStepIcon'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import { userStore } from '@/store/client/userStore'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryButton from '@/components/CategoryButton'
import Spacing from '@/components/Spacing'
import useAuth from '@/hooks/user/useAuth'
import { authStore } from '@/store/client/authStore'
const TAGCOUNT = 18
const RegisterTripStyle = () => {
  const navigate = useNavigate()
  const { registerEmail } = useAuth()
  const { userId, accessToken } = authStore()
  const {
    name,
    email,
    password,
    sex,
    phoneNumber,
    yearOfBirth,
    tripStyle,
    addTripStyle
  } = userStore()

  console.log(
    name,
    email,
    password,
    sex,
    phoneNumber,
    yearOfBirth,
    tripStyle
    // addTripStyle
  )

  // 버튼 활성화상태.
  const [activeStates, setActiveStates] = useState<boolean[]>(
    new Array(TAGCOUNT).fill(false)
  )

  const categoryButtonTextArray = [
    '힐링',
    '즉흥적',
    '계획적인',
    '액티비티',
    '먹방',
    '예술',
    '핫플',
    '쇼핑',
    '가성비',
    '역사',
    '자연',
    '단체',
    '소수',
    '해외',
    '국내',
    '단기',
    '중장기',
    '동성선호'
  ]

  // 최종적으로 선택된 여행 스타일 담은 배열
  const tripStyleArray = categoryButtonTextArray.filter(
    (btnTxt, idx) => activeStates[idx]
  )
  console.log(tripStyleArray)
  const tags: { tagName: string }[] = tripStyleArray.map(v => ({ tagName: v }))

  // 버튼 클릭 핸들러
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    const newActiveStates = [...activeStates]
    newActiveStates[parseInt(e.currentTarget.id)] =
      !newActiveStates[parseInt(e.currentTarget.id)] // 토글

    setActiveStates(newActiveStates) // 상태 업데이트
  }
  const nextStepClickHandler = () => {
    navigate('/')
    registerEmail({
      email,
      password,
      name,
      gender: sex,
      phone: phoneNumber,
      birthYear: yearOfBirth.toString()
    })
  }
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'

  return (
    <RegisterTripStyleWrapper>
      <StepIconContainer>
        <ThirdStepIcon />
      </StepIconContainer>
      <TripStyleStep>
        <ContentName>
          <UserName>{name}</UserName> 님은 어떤
        </ContentName>

        <ContentText>어떤 여행을 선호하세요?</ContentText>
      </TripStyleStep>
      <MultipleSelectionText>중복 선택 가능</MultipleSelectionText>
      <TripStyleContainer>
        <StyleBtns>
          {categoryButtonTextArray.map((text: string, idx) => (
            <CategoryButton
              id={idx}
              text={text}
              active={activeStates[idx]}
              onClick={handleButtonClick}
            />
          ))}
        </StyleBtns>
      </TripStyleContainer>

      {/* fixed된 다음 버튼 아래에도 컨텐츠가 있다는 것을 보이기 위한 Spacing */}
      <Spacing size={100} />
      <ButtonWrapper width={newRightPosition}>
        <Button
          text="다음"
          onClick={nextStepClickHandler}
          addStyle={{
            backgroundColor: 'rgba(62, 141, 0, 1)',
            color: 'rgba(240, 240, 240, 1)',
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonWrapper>
      <BlurSpacing size={40} />
    </RegisterTripStyleWrapper>
  )
}

export default RegisterTripStyle

const ButtonWrapper = styled.div<{ width: string }>`
  /* width: calc(100% - 48px);
  position: fixed;
  bottom: 4.7svh;
  z-index: 10; */

  width: 390px;
  @media (max-width: 389px) {
    width: ${props => props.width};
  }
  @media (max-width: 450px) {
    width: ${props => props.width};
  }
  /* pointer-events: none; */
  position: fixed;
  /* top: 0; */
  bottom: 4.7svh;
  /* z-index: 1001; */
  margin-left: -24px;
  padding: 0px 24px;
  z-index: 10;
`

const BlurSpacing = styled(Spacing)`
  backdrop-filter: blur(
    1.5px
  ); // fixed된 다음버튼 아래 보이는 항목 태그들을 살짝 blur처리.
  position: fixed;
  width: 100vw;

  left: 0;
  bottom: 0;
`

const RegisterTripStyleWrapper = styled.div`
  padding: 0px 24px;
  min-height: calc(100svh - 68px - 30px);
`
const StepIconContainer = styled.div`
  margin-top: 30px;
`
const TripStyleStep = styled.div`
  margin-top: 40px;
  font-size: 24px;
  font-weight: 600;
`
const TripStyleContainer = styled.div`
  margin-top: 40px;
  padding: 0px 6px;
`
const TripThemeContainer = styled.div`
  margin-top: 50px;
  padding: 0px 6px;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.025em;
  text-align: left;
`
const StyleBtns = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`
const Row = styled.div`
  display: flex;
  margin-bottom: 16px;
  button {
    margin-right: 16px;
  }
  button:last-child {
    margin-right: 0;
  }
`
const UserName = styled.span`
  display: inline-block;
  text-align: center;
`
const ContentText = styled.div`
  margin-top: 10px;
`
const ContentName = styled.div`
  display: flex;
  align-items: center;
`
const MultipleSelectionText = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  color: rgba(171, 171, 171, 1);
`
