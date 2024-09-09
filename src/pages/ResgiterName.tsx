import FirstStepIcon from '@/components/icons/FirstStepIcon'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import { userStore } from '@/store/userStore'
import { useState } from 'react'
const RegisterName = () => {
  const { name, addName } = userStore()
  const [userName, setUserName] = useState('')

  return (
    <RegisterNameWrapper>
      <StepIconContainer>
        <FirstStepIcon />
      </StepIconContainer>
      <StepContent>
        환영합니다! <br />
        이름을 설정해주세요.
      </StepContent>
      <div css={{ marginTop: '14px' }}>
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          css={{ width: '100%' }}
        />
      </div>
      <ButtonWrapper>
        <Button
          text="다음"
          addStyle={
            userName.length > 0
              ? {
                  backgroundColor: 'rgba(62, 141, 0, 1)',
                  color: 'rgba(240, 240, 240, 1)',
                  boxShadow: 'rgba(170, 170, 170, 0.1)'
                }
              : {
                  backgroundColor: 'rgba(220, 220, 220, 1)',
                  color: 'rgba(132, 132, 132, 1)'
                } // 조건이 맞지 않을 때의 스타일
          }
        />
      </ButtonWrapper>
    </RegisterNameWrapper>
  )
}

export default RegisterName

const RegisterNameWrapper = styled.div`
  padding: 0px 24px;
`
const StepIconContainer = styled.div`
  margin-top: 30px;
`

const StepContent = styled.div`
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
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 434px;
`
