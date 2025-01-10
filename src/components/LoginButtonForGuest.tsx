import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginButtonForGuest() {
  const navigate = useNavigate()
  return <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
}
const LoginButton = styled.button`
  margin-top: 16px;
  width: 143px;
  height: 42px;
  color: ${palette.비강조4};
  padding: 10px 20px;
  gap: 10px;
  border-radius: 40px;
  opacity: 0px;
  background-color: ${palette.keycolor};
`
