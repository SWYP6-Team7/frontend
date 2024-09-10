import SecondStepIcon from '@/components/icons/SecondStepIcon'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import { userStore } from '@/store/userStore'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '@/components/designSystem/input/InputField'
import InfoText from '@/components/designSystem/text/InfoText'
import Dropdown from '@/components/Dropdown'
import { z } from 'zod'
// 전화번호 유효성 검사.
const phoneNumberValid = z
  .string() // 문자열로 시작
  .regex(/^\d+$/, { message: '숫자만 입력해야 합니다.' }) // 숫자만 포함하는지 확인
  .min(10, { message: '최소 10자리여야 합니다.' }) // 최소 10자리
  .max(11, { message: '최대 11자리여야 합니다.' }) // 최대 11자리

const RegisterPhoneNumber = () => {
  const navigate = useNavigate()
  const { phoneNumber, addPhoneNumber, yearOfBirth, addYearOfBirth } =
    userStore()
  const [phone, setPhone] = useState(phoneNumber)
  const [bornYear, setBornYear] = useState(yearOfBirth)
  const [phoneNumberValidError, setPhoneNumberValidError] = useState(false)
  const handleRemoveValue = () => setPhone('')
  const nextStepClickHandler = () => {
    navigate('/registerTripStyle')
  }
  const phoneInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
    const withoutHypen = e.target.value.replace(/-/g, '')
    if (e.target.value.length >= 10) {
      if (phoneNumberValid.safeParse(withoutHypen).success) {
        addPhoneNumber(e.target.value)
        setPhoneNumberValidError(false)
      } else {
        setPhoneNumberValidError(true)
      }
    }
  }

  const years = Array.from(
    { length: 111 },
    (_, i) => new Date().getFullYear() - 14 - i
  )
  useEffect(() => {
    if (!phoneNumberValidError) {
      const withoutHypen = phone.replace(/-/g, '')
      if (withoutHypen.replace(/-/g, '').length == 10)
        setPhone(withoutHypen.replace(/^(\d{3})(\d{3})(\d{4})$/, `$1-$2-$3`))
      else if (withoutHypen.replace(/-/g, '').length == 11)
        setPhone(withoutHypen.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    }
  }, [phone])

  useEffect(() => {
    addYearOfBirth(bornYear)
  }, [bornYear])
  return (
    <RegisterPhoneNumberWrapper>
      <StepIconContainer>
        <SecondStepIcon />
      </StepIconContainer>
      <PhoneNumberStep>
        전화번호를 <br />
        입력해주세요.
      </PhoneNumberStep>
      <div css={{ marginTop: '14px' }}>
        <InputField
          shake={phoneNumberValidError && phone.length >= 10}
          success={phone.length >= 10 && !phoneNumberValidError}
          hasError={phoneNumberValidError && phone.length >= 10}
          placeholder="000-0000-0000"
          value={phone}
          onChange={e => phoneInputChangeHandler(e)}
          handleRemoveValue={handleRemoveValue}
        />
        <div css={{ marginTop: 16, padding: '0 6px' }}>
          {phoneNumberValidError && phone.length >= 10 ? (
            <InfoText hasError={phone.length >= 10 && phoneNumberValidError}>
              숫자만 입력할 수 있습니다.(10~11자리)
            </InfoText>
          ) : (
            <EmptyArea></EmptyArea>
          )}
        </div>
      </div>

      <AgeStep>
        <Content>나이가 어떻게 되세요?</Content>
        <DropdownContainer>
          <Dropdown
            list={years}
            value={bornYear}
            setValue={setBornYear}
          />
          <div css={{ marginLeft: '16px', fontWeight: 500, fontSize: '20px' }}>
            년생
          </div>
        </DropdownContainer>
      </AgeStep>
      <ButtonWrapper css={{ marginTop: '268px' }}>
        <Button
          text="다음"
          onClick={nextStepClickHandler}
          addStyle={
            phone.length >= 10 && !phoneNumberValidError
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
      </ButtonWrapper>
    </RegisterPhoneNumberWrapper>
  )
}

export default RegisterPhoneNumber

const RegisterPhoneNumberWrapper = styled.div`
  padding: 0px 24px;
`
const StepIconContainer = styled.div`
  margin-top: 30px;
`
const EmptyArea = styled.div`
  height: 16px;
`

const PhoneNumberStep = styled.div`
  margin-top: 30px;
  width: 343px;
  height: 68px;
  padding: 0px 6px 0px 6px;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;
  letter-spacing: -0.025em;
  text-align: left;
`
const AgeStep = styled.div`
  margin-top: 34px;
`
const Content = styled.div`
  font-size: 24px;
  font-weight: 600;
  padding: 0px 6px;
  padding-bottom: 10px;
`
const DropdownContainer = styled.div`
  display: flex;
  height: 52px;
  margin-top: 14px;
  align-items: center;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
// 년생 드롭다운
