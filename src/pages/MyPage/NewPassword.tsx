'use client'
import Button from '@/components/designSystem/Buttons/Button'
import ButtonContainer from '@/components/ButtonContainer'
import StateInputField from '@/components/designSystem/input/StateInputField'
import InfoText from '@/components/designSystem/text/InfoText'
import { emailSchema, passwordSchema } from '@/utils/schema'
import Spacing from '@/components/Spacing'
import useMyPage from '@/hooks/myPage/useMyPage'
import { myPageStore } from '@/store/client/myPageStore'
import { userStore } from '@/store/client/userStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ErrorProps {
  password: undefined | string
  confirmPassword: undefined | string
}

export default function NewPassword() {
  const { addIsPasswordUpdated } = myPageStore()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [success, setSuccess] = useState({
    password: false,
    confirmPassword: false
  })
  const [error, setError] = useState<ErrorProps>({
    password: undefined,
    confirmPassword: undefined
  })
  const [shake, setShake] = useState({
    password: false,
    confirmPassword: false
  })
  const { addPassword, email } = userStore()
  const { updatePasswordMutation, isUpatedPassword, isUpdatedPasswordError } =
    useMyPage()
  const router = useRouter()

  const allSuccess = Object.values(success).every(value => value)

  const handleRemoveValue = (name: 'password' | 'confirmPassword') => {
    if (name === 'password') {
      setSuccess(prev => ({ ...prev, password: false }))
      setFormData(prev => ({ ...prev, password: '' }))
    } else {
      setSuccess(prev => ({ ...prev, confirmPassword: false }))
      setFormData(prev => ({ ...prev, confirmPassword: '' }))
    }
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (name === 'password') {
      const passwordValidation = passwordSchema.safeParse(value)
      let passwordError = false
      const emailLocalPart = email.split('@')[0]
      if (value === email || value === emailLocalPart) {
        passwordError = true
      }
      if (!passwordValidation.success || passwordError) {
        if (passwordError) {
          setError(prev => ({
            ...prev,
            password: '이메일과 동일한 형식의 비밀번호는 사용할 수 없습니다.'
          }))
        } else {
          setError(prev => ({
            ...prev,
            password: passwordValidation.error!.flatten().formErrors[0]
          }))
        }
      } else {
        setError(prev => ({
          ...prev,
          password: undefined
        }))
      }
      setSuccess(prev => ({
        ...prev,
        password: passwordValidation.success && !passwordError
      }))
    } else {
      if (formData.password !== value) {
        setError(prev => ({
          ...prev,
          confirmPassword: '비밀번호가 일치하지 않습니다.'
        }))
      } else {
        setError(prev => ({
          ...prev,
          confirmPassword: undefined
        }))
      }
      setSuccess(prev => ({
        ...prev,
        confirmPassword: formData.password === value
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (allSuccess) {
      try {
        const res = await updatePasswordMutation({
          newPassword: formData.password,
          newPasswordConfirm: formData.confirmPassword
        })
        if (res === undefined) {
          throw new Error('비밀번호 업데이트 에러')
        }
      } catch (e) {
        console.log(e, '새 비밀번호 업데이트 에러')
        setShake(prev => ({
          ...prev,
          email: true
        }))
        setError(prev => ({
          ...prev,
          password: '새 비밀번호가 일치하지 않습니다.'
        }))
        setTimeout(() => {
          setShake({ password: false, confirmPassword: false })
        }, 500)
        return
      }
    } else {
      setShake({
        password: Boolean(error.password),
        confirmPassword: Boolean(error.confirmPassword)
      })

      setTimeout(() => {
        setShake({ password: false, confirmPassword: false })
      }, 500)
    }
  }

  useEffect(() => {
    if (isUpatedPassword) {
      addPassword(formData.password)
      addIsPasswordUpdated(true)
      router.push('/editMyInfo')
    }
  }, [isUpatedPassword])

  useEffect(() => {
    if (isUpdatedPasswordError) {
      setShake(prev => ({
        ...prev,
        email: true
      }))
      setError(prev => ({
        ...prev,
        password: '새 비밀번호가 일치하지 않습니다.'
      }))
      setTimeout(() => {
        setShake({ password: false, confirmPassword: false })
      }, 500)
    }
  }, [isUpdatedPasswordError])

  return (
    <Container onSubmit={handleSubmit}>
      <FieldContainer>
        <Label htmlFor="password">새로운 비밀번호를 입력해주세요</Label>
        <Spacing size={16} />
        <StateInputField
          handleRemoveValue={() => handleRemoveValue('password')}
          type="password"
          onChange={changeValue}
          shake={shake.password}
          name="password"
          placeholder="비밀번호 입력"
          hasError={Boolean(error.password)}
          value={formData.password}
          success={success.password}
        />
        <Spacing size={10} />
        {error.password ? (
          <InfoText hasError>{error.password}</InfoText>
        ) : success.password ? (
          <InfoText success>영문 대문자, 특수문자 포함 8~20자</InfoText>
        ) : (
          <InfoText>영문 대문자, 특수문자 포함 8~20자</InfoText>
        )}
      </FieldContainer>

      <Spacing size={14} />
      <FieldContainer>
        <StateInputField
          shake={shake.confirmPassword}
          handleRemoveValue={() => handleRemoveValue('confirmPassword')}
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 재입력"
          onChange={changeValue}
          hasError={Boolean(error.confirmPassword)}
          value={formData.confirmPassword}
          success={success.confirmPassword}
        />
        <Spacing size={10} />
        {error.confirmPassword ? (
          <InfoText hasError>{error.confirmPassword}</InfoText>
        ) : (
          <Spacing size={16} />
        )}
      </FieldContainer>
      <ButtonContainer>
        {allSuccess ? (
          <Button text="완료" />
        ) : (
          <Button
            text="완료"
            addStyle={{
              backgroundColor: 'rgba(220, 220, 220, 1)',
              color: 'rgba(132, 132, 132, 1)',
              boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
            }}
            disabled={true}
          />
        )}
      </ButtonContainer>
    </Container>
  )
}
const Container = styled.form`
  padding: 0 24px;
  margin-top: 24px;
`

const FieldContainer = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
`

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  color: ${palette.기본};
  text-align: left;
`
