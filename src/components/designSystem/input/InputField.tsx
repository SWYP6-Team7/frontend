'use client'
import styled from '@emotion/styled'
import React, { FocusEventHandler, forwardRef, useState } from 'react'
import RemoveButton from './RemoveButton'
import { palette } from '@/styles/palette'

// React.InputHTMLAttributes<HTMLInputElement
// input element의 property 타입들도 상속받아서 사용할 수 있음
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleRemoveValue?: () => void
  icon?: React.ReactNode
  isRemove?: boolean
}

interface ContainerProps {
  bgColor: string
  borderColor: string
}

// forwardRef : 부모 컴포넌트에서 자식 컴포넌트 안의 DOM element에 접근하고 싶을 때 사용한다.
// 첫번째 generic으로 ref type, 두번째로 지정한 props type
// React.InputHTMLAttributes<HTMLInputElement> 이걸 줬기 때문에 input의 프로퍼티들도 props로 내려줄 수 있음

// 사용방법
// 기본적으로 input 사용하듯이 props 사용하면 됨
// onBlur와 onFocus 함수 추가 가능
const InputField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      icon,
      handleRemoveValue = () => {},
      isRemove = true,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    const bgColor = focused
      ? palette.greenVariant
      : props.value === ''
        ? palette.검색창
        : palette.비강조4
    const borderColor = focused ? palette.keycolor : bgColor
    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <Container
        bgColor={bgColor}
        borderColor={borderColor}>
        {icon && <IconContainer>{icon}</IconContainer>}
        <Input
          ref={ref}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        <div>
          {props.value === '' ? (
            <> </>
          ) : (
            isRemove && <RemoveButton onClick={handleRemoveValue} />
          )}
        </div>
      </Container>
    )
  }
)

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 48px;
  padding: 0px 16px;
  border-radius: 50px;
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid ${props => props.borderColor};
  background-color: ${props => props.bgColor};
`

const IconContainer = styled.div`
  margin-right: 11px;
`

const Input = styled.input`
  flex: 1;
  width: 100%;
  font-family: 'Pretendard';
  &::placeholder {
    color: ${palette.비강조2};
  }
  height: 100%;
  outline: none;
  font-weight: 400;
  border: none;
  background-color: transparent;
  font-size: 16px;
  letter-spacing: -0.04px;
  border: #cdcdcd;
`

export default InputField
