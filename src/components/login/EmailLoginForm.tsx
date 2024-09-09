import styled from '@emotion/styled'
import React from 'react'
import LoginInput from './LoginInput'
import { useForm } from 'react-hook-form'
import Spacing from '../Spacing'
import { Link } from 'react-router-dom'
import Button from '../Button'

interface IForm {
  email: string
  password: string
}

const EmailLoginForm = () => {
  const { register, handleSubmit } = useForm<IForm>()

  const onSubmit = (data: IForm) => {
    console.log(data)
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <LoginInput
        type="email"
        placeholder="email"
        {...register('email', { required: true })}
      />
      <Spacing size={5} />
      <LoginInput
        type="password"
        placeholder="password"
        {...register('password', { required: true })}
      />
      <Spacing size={'7.1svh'} />
      <SignUpLinkContainer>
        <span css={{ color: '#848484' }}>처음 오셨나요?</span>
        <Link
          to="/registerForm"
          css={{ textDecoration: 'underline' }}>
          회원가입
        </Link>
      </SignUpLinkContainer>
      <Spacing size={26} />
      <Button
        text="로그인"
        onClick={() => {}}
        addStyle={{
          backgroundColor: 'rgba(220, 220, 220, 1)',
          color: 'rgba(132, 132, 132, 1)',
          boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
        }}
      />
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
