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
  const { name, email, password, sex, agegroup, tripStyle, addTripStyle } =
    userStore()

  console.log(name, email, password, sex, agegroup, tripStyle)

  // 버튼 활성화상태.
  const [activeStates, setActiveStates] = useState<boolean[]>(
    new Array(TAGCOUNT).fill(false)
  )

  const categoryButtonTextArray = [
    { label: '🇰🇷국내', value: '국내' },
    { label: '즉흥적', value: 'impromptu' },
    { label: '계획적인', value: 'planned' },
    { label: '액티비티', value: 'activity' },
    { label: '먹방', value: 'food' },
    { label: '예술', value: 'art' },
    { label: '핫플', value: 'hot_place' },
    { label: '쇼핑', value: 'shopping' },
    { label: '가성비', value: 'value_for_money' },
    { label: '역사', value: 'history' },
    { label: '자연', value: 'nature' },
    { label: '단체', value: 'group' },
    { label: '소수', value: 'few' },
    { label: '해외', value: 'overseas' },
    { label: '국내', value: 'domestic' },
    { label: '단기', value: 'short_term' },
    { label: '중장기', value: 'long_term' },
    { label: '동성선호', value: 'same_gender' }
  ]

  // 최종적으로 선택된 여행 스타일 담은 배열
  const tripStyleArray = categoryButtonTextArray
    .filter((_, idx) => activeStates[idx])
    .map(item => item.value)
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
      agegroup: agegroup as string
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
          {categoryButtonTextArray.map((item, idx) => (
            <CategoryButton
              id={idx.toString()}
              text={item.label}
              active={activeStates[idx]}
              onClick={handleButtonClick}
            />
          ))}
        </StyleBtns>
      </TripStyleContainer>

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
  width: 390px;
  @media (max-width: 389px) {
    width: ${props => props.width};
  }
  @media (max-width: 450px) {
    width: ${props => props.width};
  }
  position: fixed;
  bottom: 4.7svh;
  margin-left: -24px;
  padding: 0px 24px;
  z-index: 10;
`

const BlurSpacing = styled(Spacing)`
  backdrop-filter: blur(1.5px);
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
const StyleBtns = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
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
  color: rgba(171, 171, 171, 1);
`
