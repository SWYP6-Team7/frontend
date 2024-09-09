import styled from '@emotion/styled'
import React, { forwardRef } from 'react'

interface LoginInputrops extends React.InputHTMLAttributes<HTMLInputElement> {}

const LoginInput = forwardRef<HTMLInputElement, LoginInputrops>(
  ({ onFocus, onBlur, ...props }, ref) => {
    return <Input {...props} />
  }
)

const Input = styled.input`
  width: 100%;
  padding: 0 12px;
  height: 52px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #848484;
  outline: none;

  &::placeholder {
    color: #848484;
  }
`

export default LoginInput
