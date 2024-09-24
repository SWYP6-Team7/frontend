import styled from '@emotion/styled'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import LoginInput from './LoginInput'
import { z } from 'zod'
import Spacing from '../Spacing'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import InfoText from '../designSystem/text/InfoText'
import useAuth from '@/hooks/user/useAuth'
import InputField from '../designSystem/input/InputField'

export const emailSchema = z
  .string()
  .email('이메일 주소를 정확하게 입력해주세요.')
export const passwordSchema = z
  .string()
  .min(8, '영문 대문자, 특수문자 포함 8~20자')
  .max(20, '영문 대문자, 특수문자 포함 8~20자')
  .refine(value => /[A-Z]/.test(value), '영문 대문자, 특수문자 포함 8~20자')
  .refine(
    value => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    '영문 대문자, 특수문자 포함 8~20자'
  )

const EmailLoginForm = () => {
  const navigate = useNavigate()
  const { loginEmail } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [success, setSuccess] = useState({
    email: false,
    password: false
  })
  const [error, setError] = useState<undefined | string>()
  const [shake, setShake] = useState(false)

  const handleRemoveValue = (name: 'email' | 'password') => {
    if (name === 'email') {
      setSuccess(prev => ({ ...prev, email: false }))
      setFormData(prev => ({ ...prev, email: '' }))
    } else {
      setSuccess(prev => ({ ...prev, password: false }))
      setFormData(prev => ({ ...prev, password: '' }))
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await loginEmail(formData)
      navigate('/')
      return
    } catch (error: any) {
      setError('로그인 정보를 다시 확인해주세요.')
      setShake(true)

      setTimeout(() => {
        setShake(false)
      }, 500)
      return
    }
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (name === 'email') {
      const emailValidation = emailSchema.safeParse(value)
      if (!emailValidation.success) {
        setError(emailValidation.error.flatten().formErrors[0])
      } else {
        setError(undefined)
        setSuccess(prev => ({
          ...prev,
          email: emailValidation.success
        }))
      }
    } else {
      const passwordValidation = passwordSchema.safeParse(value)

      if (!passwordValidation.success) {
        setError(passwordValidation.error!.flatten().formErrors[0])
      } else {
        setError(undefined)
      }
      setSuccess(prev => ({
        ...prev,
        password: passwordValidation.success
      }))
    }
  }
  return (
    <Container onSubmit={onSubmit}>
      <InputField
        handleRemoveValue={() => handleRemoveValue('email')}
        type="email"
        value={formData.email}
        placeholder="email"
        name="email"
        height={54}
        success={success.email}
        onChange={changeValue}
      />
      <Spacing size={16} />
      <InputField
        handleRemoveValue={() => handleRemoveValue('password')}
        type="password"
        height={54}
        value={formData.password}
        placeholder="password"
        name="password"
        success={success.password}
        onChange={changeValue}
      />
      <Spacing size={14} />
      {error ? (
        <InfoText
          shake={shake}
          hasError>
          {error}
        </InfoText>
      ) : (
        <Spacing size={16} />
      )}
      <Spacing size={24} />
      <SignUpLinkContainer>
        <span css={{ color: '#848484' }}>처음 오셨나요?</span>
        <Link
          to="/registerForm"
          css={{ textDecoration: 'underline' }}>
          회원가입
        </Link>
      </SignUpLinkContainer>
      <Spacing size={26} />
      {success.email && success.password ? (
        <Button
          text="로그인"
          onClick={() => {}}
        />
      ) : (
        <Button
          text="로그인"
          disabled
          onClick={() => {}}
          addStyle={{
            backgroundColor: 'rgba(220, 220, 220, 1)',
            color: 'rgba(132, 132, 132, 1)',
            boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
          }}
        />
      )}
    </Container>
  )
}

const Container = styled.form`
  padding: 0 24px;
  display: flex;
  width: 100%;
  font-size: 14px;
  flex-direction: column;
  line-height: 16px;
  letter-spacing: -0.04px;
  justify-content: center;
`
const SignUpLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
`

export default EmailLoginForm
