import styled from '@emotion/styled'
import React, { FocusEventHandler, forwardRef, useState } from 'react'
import RemoveButton from '../designSystem/input/RemoveButton'

interface LoginInputrops extends React.InputHTMLAttributes<HTMLInputElement> {
  success?: boolean
  handleRemoveValue: () => void
}

interface InputProps {
  borderColor: string
}

const LoginInput = forwardRef<HTMLInputElement, LoginInputrops>(
  ({ onFocus, onBlur, handleRemoveValue, success = false, ...props }, ref) => {
    const [focused, setFocused] = useState(false)

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(false)
      onBlur?.(event)
    }
    const borderColor = success
      ? '#3E8D00'
      : focused || props.value !== ''
        ? '#1A1A1A'
        : '#CDCDCD'
    return (
      <Container>
        <Input
          borderColor={borderColor}
          ref={ref}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        <ButtonContainer>
          {props.value !== '' && <RemoveButton onClick={handleRemoveValue} />}
        </ButtonContainer>
      </Container>
    )
  }
)

const Container = styled.div`
  width: 100%;
  position: relative;
`

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 0 12px;
  height: 52px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${props => props.borderColor};
  outline: none;

  &::placeholder {
    color: #848484;
  }
`

const ButtonContainer = styled.div`
  right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export default LoginInput
