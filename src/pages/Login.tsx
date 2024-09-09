import InputField from '@/components/designSystem/input/InputField'
import InfoText from '@/components/designSystem/text/InfoText'
import React, { ChangeEvent, useCallback, useState } from 'react'

const Login = () => {
  const [test, setTest] = useState('')
  const [shake, setShake] = useState(false)
  const handleRemoveValue = () => {
    setTest('')
  }
  const changeFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTest(e.target.value)
  }, [])

  const handleTrigger = () => {
    setShake(true)
    setTimeout(() => {
      setShake(false)
    }, 500)
  }
  return (
    <div
      style={{
        paddingTop: 100,
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%'
      }}>
      <InputField
        value={test}
        hasError
        shake={shake}
        placeholder="email"
        handleRemoveValue={handleRemoveValue}
        onChange={changeFormValues}
      />
      <div css={{ marginTop: 10, padding: '0 6px' }}>
        <InfoText hasError>이메일 주소를 정확하게 입력해주세요</InfoText>
      </div>
      <button
        style={{ marginTop: 40 }}
        onClick={handleTrigger}>
        흔들흔들
      </button>
    </div>
  )
}

export default Login
