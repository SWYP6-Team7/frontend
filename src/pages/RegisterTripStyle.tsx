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
    tripStyle,
    addTripStyle
  )

  // 버튼 활성화상태.
  const [activeStates, setActiveStates] = useState<boolean[]>(
    new Array(20).fill(false)
  )

  const categoryButtonTextArray = ['즉흥', '계획적인', '힐링']

  new Array(17).fill('항목').forEach(v => categoryButtonTextArray.push(v))

  // 최종적으로 선택된 여행 스타일 담은 배열
  const tripStyleArray = categoryButtonTextArray.filter(
    (btnTxt, idx) => activeStates[idx]
  )
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

  return (
    <RegisterTripStyleWrapper>
      <StepIconContainer>
        <ThirdStepIcon />
      </StepIconContainer>
      <TripStyleStep>
        <ContentName>
          <UserName>{name}님은 어떤</UserName>
        </ContentName>

        <ContentText>어떤 여행을 선호하세요?</ContentText>
      </TripStyleStep>
      <MultipleSelectionText>중복 선택 가능</MultipleSelectionText>
      <TripStyleContainer>
        <Title>✈️ 여행 스타일</Title>
        <StyleBtns>
          <Row>
            <CategoryButton
              id={0}
              text={categoryButtonTextArray[0]}
              active={activeStates[0]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={1}
              text={categoryButtonTextArray[1]}
              active={activeStates[1]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={2}
              text={categoryButtonTextArray[2]}
              active={activeStates[2]}
              onClick={handleButtonClick}
            />
          </Row>
          <Row>
            <CategoryButton
              id={3}
              text={categoryButtonTextArray[3]}
              active={activeStates[3]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={4}
              text={categoryButtonTextArray[4]}
              active={activeStates[4]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={5}
              text={categoryButtonTextArray[5]}
              active={activeStates[5]}
              onClick={handleButtonClick}
            />
          </Row>
          <Row>
            <CategoryButton
              id={6}
              text={categoryButtonTextArray[6]}
              active={activeStates[6]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={7}
              text={categoryButtonTextArray[7]}
              active={activeStates[7]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={8}
              text={categoryButtonTextArray[8]}
              active={activeStates[8]}
              onClick={handleButtonClick}
            />
          </Row>
        </StyleBtns>
      </TripStyleContainer>
      <TripThemeContainer>
        <Title>🌊 테마</Title>
        <StyleBtns>
          <Row>
            <CategoryButton
              id={9}
              text={categoryButtonTextArray[9]}
              active={activeStates[9]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={10}
              text={categoryButtonTextArray[10]}
              active={activeStates[10]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={11}
              text={categoryButtonTextArray[11]}
              active={activeStates[11]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={12}
              text={categoryButtonTextArray[12]}
              active={activeStates[12]}
              onClick={handleButtonClick}
            />
          </Row>
          <Row>
            <CategoryButton
              id={13}
              text={categoryButtonTextArray[13]}
              active={activeStates[13]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={14}
              text={categoryButtonTextArray[14]}
              active={activeStates[14]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={15}
              text={categoryButtonTextArray[15]}
              active={activeStates[15]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={16}
              text={categoryButtonTextArray[16]}
              active={activeStates[16]}
              onClick={handleButtonClick}
            />
          </Row>
          <Row>
            <CategoryButton
              id={17}
              text={categoryButtonTextArray[17]}
              active={activeStates[17]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={18}
              text={categoryButtonTextArray[18]}
              active={activeStates[18]}
              onClick={handleButtonClick}
            />
            <CategoryButton
              id={19}
              text={categoryButtonTextArray[19]}
              active={activeStates[19]}
              onClick={handleButtonClick}
            />
          </Row>
        </StyleBtns>
      </TripThemeContainer>
      {/* fixed된 다음 버튼 아래에도 컨텐츠가 있다는 것을 보이기 위한 Spacing */}
      <Spacing size={100} />
      <ButtonWrapper>
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

const ButtonWrapper = styled.div`
  width: calc(100% - 48px);

  z-index: 10;
  left: 24px;
  position: absolute;
  bottom: 4.7svh;
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
  margin-top: 30px;
  font-size: 24px;
  font-weight: 600;
`
const TripStyleContainer = styled.div`
  margin-top: 50px;
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
  div:last-child {
    margin-bottom: 0;
  }
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
