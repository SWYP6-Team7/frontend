import styled from '@emotion/styled'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import LoginInput from './LoginInput'
import { z } from 'zod'
import Spacing from '../Spacing'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import InfoText from '../designSystem/text/InfoText'

export const emailSchema = z.string().email()
export const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .refine(value => /[A-Z]/.test(value))
  .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value))

const EmailLoginForm = () => {
  const navigate = useNavigate()
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
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        setError('로그인 정보를 다시 확인해주세요.')
        setShake(true)
        setTimeout(() => {
          setShake(false)
        }, 500)
      } else {
        navigate('/')
      }
    } catch (error) {
      setError('로그인 정보를 다시 확인해주세요.')
      setShake(true)
      setTimeout(() => {
        setShake(false)
      }, 500)
    }
  }

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (name === 'email') {
      const emailValidation = emailSchema.safeParse(value)

      setSuccess(prev => ({
        ...prev,
        email: emailValidation.success
      }))
    } else {
      const passwordValidation = passwordSchema.safeParse(value)
      let passwordError = false
      const emailLocalPart = formData.email.split('@')[0]
      if (
        formData.password === formData.email ||
        formData.password === emailLocalPart
      ) {
        passwordError = true
      }
      setSuccess(prev => ({
        ...prev,
        password: passwordValidation.success && !passwordError
      }))
    }
  }
  return (
    <Container onSubmit={onSubmit}>
      <LoginInput
        handleRemoveValue={() => handleRemoveValue('email')}
        type="email"
        value={formData.email}
        placeholder="email"
        name="email"
        success={success.email}
        onChange={changeValue}
      />
      <Spacing size={5} />
      <LoginInput
        handleRemoveValue={() => handleRemoveValue('password')}
        type="password"
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
