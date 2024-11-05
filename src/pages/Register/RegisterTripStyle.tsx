import ThirdStepIcon from '@/components/icons/ThirdStepIcon'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import { userStore } from '@/store/client/userStore'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryButton from '@/components/CategoryButton'
import Spacing from '@/components/Spacing'
import useAuth from '@/hooks/user/useAuth'

import { palette } from '@/styles/palette'
import { IRegisterGoogle, IRegisterKakao } from '@/model/auth'

const TAGCOUNT = 18
const categoryButtonTextArray = [
  { label: '🇰🇷 국내', value: '국내' },
  { label: '🌎 해외', value: '해외' },
  { label: '⏱️ 단기', value: '단기' },
  { label: '✊ 즉흥', value: '즉흥' },
  { label: '📝 계획', value: '계획' },
  { label: '🧳 중장기', value: '중장기' },
  { label: '🏄 액티비티', value: '액티비티' },
  { label: '☁️ 여유', value: '여유' },
  { label: '🍔 먹방', value: '먹방' },
  { label: '💸 가성비', value: '가성비' },
  { label: '📷 핫플', value: '핫플' },
  { label: '🛍️ 쇼핑', value: '쇼핑' },
  { label: '🎨 예술', value: '예술' },
  { label: '🗿 역사', value: '역사' },
  { label: '🏔️ 자연', value: '자연' },
  { label: '🥳 단체', value: '단체' },
  { label: '🙂 소수', value: '소수' },
  { label: '⭐️ 동성선호', value: '동선선호' }
]

const RegisterTripStyle = () => {
  const navigate = useNavigate()
  const {
    registerEmail,
    registerEmailMutation: { isSuccess },
    socialLogin: socialLoginApi,
    socialLoginMutation,
    registerSocial
  } = useAuth()

  const { isSuccess: isSocialSuccess, isError: isSocialError } =
    socialLoginMutation

  const {
    addName,
    addEmail,
    name,
    email,
    password,
    sex,
    agegroup,
    resetAge,
    resetForm,
    resetGender,
    resetName,
    socialLogin,
    setSocialLogin
  } = userStore()

  useEffect(() => {
    if (socialLogin === 'google') {
      if (!agegroup || !sex) {
        setSocialLogin(null)
        resetName()
        resetForm()
        resetAge()
        resetGender()
        navigate('/login')
      }
    } else if (socialLogin === 'kakao') {
      if (!email || !agegroup || !sex) {
        resetForm()
        resetAge()
        resetGender()
        navigate('/registerForm')
      }
    } else if (socialLogin === 'naver') {
      setSocialLogin(null)
      resetName()
      resetForm()
      resetAge()
      resetGender()
      navigate('/login')
    } else {
      if (!email || !name || !agegroup || !sex) {
        resetName()
        resetForm()
        resetAge()
        resetGender()
        navigate('/registerForm')
      }
    }
  }, [email, name, agegroup])

  useEffect(() => {
    if (isSuccess) {
      navigate('/registerDone')
      resetName()
      resetForm()
      resetAge()
      resetGender()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSocialSuccess) {
      navigate('/registerDone')
      resetName()
      resetForm()
      resetAge()
      resetGender()
      setSocialLogin(null)
    }
    if (isSocialError) {
      alert(isSocialError)
      setSocialLogin(null)
      navigate('/login')
    }
  }, [isSocialError, isSocialSuccess])

  // 버튼 활성화상태.
  const [activeStates, setActiveStates] = useState<boolean[]>(
    new Array(TAGCOUNT).fill(false)
  )

  // 최종적으로 선택된 여행 스타일 담은 배열
  const tripStyleArray = categoryButtonTextArray
    .filter((_, idx) => activeStates[idx])
    .map(item => item.value)

  // 버튼 클릭 핸들러
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
    const newActiveStates = [...activeStates]
    newActiveStates[parseInt(e.currentTarget.id)] =
      !newActiveStates[parseInt(e.currentTarget.id)] // 토글

    const activeArray = newActiveStates.filter(v => v === true)
    if (activeArray.length <= 5) {
      setActiveStates(newActiveStates) // 상태 업데이트
    }
  }

  const completeHandler = () => {
    if (socialLogin === null) {
      registerEmail({
        email,
        password,
        name,
        gender: sex,
        agegroup: agegroup as string,
        preferredTags: tripStyleArray
      })
    } else if (socialLogin === 'google') {
      registerSocial({
        gender: sex,
        agegroup: agegroup as string,
        preferredTags: tripStyleArray,
        social: 'google'
      } as IRegisterGoogle)
    } else if (socialLogin === 'kakao') {
      registerSocial({
        gender: sex,
        email: email,
        agegroup: agegroup as string,
        preferredTags: tripStyleArray,
        social: 'kakao'
      } as IRegisterKakao)
    }
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
      <MultipleSelectionText>중복 선택 가능 (최대 5개)</MultipleSelectionText>
      <TripStyleContainer>
        <StyleBtns>
          {categoryButtonTextArray.map((item, idx) => (
            <CategoryButton
              id={idx}
              text={item.label}
              active={activeStates[idx]}
              onClick={handleButtonClick}
            />
          ))}
        </StyleBtns>
      </TripStyleContainer>
      <Spacing size={120} />
      <ButtonWrapper width={newRightPosition}>
        <Button
          disabled={tripStyleArray.length === 0}
          text="다음"
          onClick={completeHandler}
          addStyle={{
            backgroundColor:
              tripStyleArray.length > 0
                ? 'rgba(62, 141, 0, 1)'
                : 'rgba(220, 220, 220, 1)',
            color:
              tripStyleArray.length > 0
                ? 'rgba(240, 240, 240, 1)'
                : palette.비강조,
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonWrapper>
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
  bottom: 0;

  background-color: white;
  margin-left: -24px;
  padding: 14px 24px 38px 24px;
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
