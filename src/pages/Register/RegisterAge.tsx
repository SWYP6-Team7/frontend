import SecondStepIcon from '@/components/icons/SecondStepIcon'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import { userStore } from '@/store/client/userStore'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { authStore } from '@/store/client/authStore'
import SearchFilterTag from '@/components/designSystem/tag/SearchFilterTag'
import { palette } from '@/styles/palette'
import ButtonContainer from '@/components/ButtonContainer'

const AGE_LIST = ['10대', '20대', '30대', '40대', '50대 이상']

const RegisterAge = () => {
  const navigate = useNavigate()
  const { agegroup, addAgegroup } = userStore()
  const { userId, accessToken } = authStore()
  const [genderCheck, setGenderCheck] = useState(false)

  const nextStepClickHandler = () => {
    if (agegroup) {
      if (location.pathname == '/registerAge') {
        console.log(1)
        navigate('/registerAge/registerGender')
      } else if (
        genderCheck &&
        location.pathname == '/registerAge/registerGender'
      ) {
        navigate('/registerTripStyle')
      }
    }
  }

  const handleClickage = (age: string) => {
    addAgegroup(age)
  }

  return (
    <RegisterAgeWrapper>
      <StepIconContainer>
        <SecondStepIcon />
      </StepIconContainer>

      <AgeStep>
        <Content>나이가 어떻게 되세요?</Content>
        <AgeList>
          {AGE_LIST.map((age, idx) => (
            <SearchFilterTag
              addStyle={{
                backgroundColor:
                  agegroup === age
                    ? 'rgba(227, 239, 217, 1)'
                    : ' rgba(240, 240, 240, 1)',
                color:
                  agegroup === age
                    ? `${palette.keycolor}`
                    : 'rgba(52, 52, 52, 1)',

                border:
                  agegroup === age ? `1px solid ${palette.keycolor}` : 'none'
              }}
              idx={idx}
              onClick={() => handleClickage(age)}
              text={age}
              key={age}
            />
          ))}
        </AgeList>
      </AgeStep>
      <Outlet context={{ setGenderCheck }} />
      <ButtonContainer>
        <Button
          text="다음"
          onClick={nextStepClickHandler}
          disabled={!Boolean(agegroup)}
          addStyle={
            true
              ? {
                  backgroundColor: 'rgba(62, 141, 0, 1)',
                  color: 'rgba(240, 240, 240, 1)',
                  boxShadow: 'rgba(170, 170, 170, 0.1)'
                }
              : {
                  backgroundColor: 'rgba(220, 220, 220, 1)',
                  color: 'rgba(132, 132, 132, 1)'
                }
          }
        />
      </ButtonContainer>
    </RegisterAgeWrapper>
  )
}

export default RegisterAge

const AgeList = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 16px;
  width: 70%;
`

const RegisterAgeWrapper = styled.div`
  padding: 0px 24px;

  min-height: calc(100svh - 68px - 30px);
`
const StepIconContainer = styled.div`
  margin-top: 30px;
`

const AgeStep = styled.div`
  margin-top: 40px;
`
const Content = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding: 0px 6px;
  padding-bottom: 16px;
`

const ButtonWrapper = styled.div`
  right: 24px;
  left: 24px;
  position: absolute;
  bottom: 4.7svh;
`
