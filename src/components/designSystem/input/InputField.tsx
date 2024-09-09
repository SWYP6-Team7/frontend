import CheckIcon from '@/components/icons/CheckIcon'
import XIcon from '@/components/icons/XIcon'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { FocusEventHandler, forwardRef, useState } from 'react'

// React.InputHTMLAttributes<HTMLInputElement
// input element의 property 타입들도 상속받아서 사용할 수 있음
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  success?: boolean
  shake?: boolean
  handleRemoveValue: () => void
}

interface ContainerProps {
  bgColor: string
  shake: boolean
  borderColor: string
}

interface InputProps {
  bgColor: string
}

// forwardRef : 부모 컴포넌트에서 자식 컴포넌트 안의 DOM element에 접근하고 싶을 때 사용한다.
// 첫번째 generic으로 ref type, 두번째로 지정한 props type
// React.InputHTMLAttributes<HTMLInputElement> 이걸 줬기 때문에 input의 프로퍼티들도 props로 내려줄 수 있음
const InputField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      hasError = false,
      success = false,
      shake = false,
      handleRemoveValue,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    // 우선순위 1.에러가 있는지? 2. 포커싱 되어있는지
    const borderColor = hasError ? '#ED1E1E' : focused ? '#1A1A1A' : '#CDCDCD'
    const bgColor = hasError ? '#FFF7F7' : '#FFFFFF'

    const handleFocus: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = event => {
      setFocused(false)
      onBlur?.(event)
    }
    // margin같은 속성은 유동적으로 나타나는 애들한테 주는게 좋음
    return (
      <Container
        shake={shake}
        bgColor={bgColor}
        borderColor={borderColor}>
        <Input
          bgColor={bgColor}
          ref={ref}
          aria-invalid={hasError}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        <div>
          {success ? (
            focused ? (
              <RemoveBUtton onClick={handleRemoveValue} />
            ) : (
              <CheckIcon status="done" />
            )
          ) : props.value === '' ? (
            <CheckIcon />
          ) : (
            <RemoveBUtton onClick={handleRemoveValue} />
          )}
        </div>
      </Container>
    )
  }
)

const RemoveBUtton = ({ onClick }: { onClick: () => void }) => {
  return (
    <XIconButton onClick={onClick}>
      <XIcon />
    </XIconButton>
  )
}

const XIconButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
`
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 52px;
  padding: 0px 12px;
  border-radius: 18px;
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid ${props => props.borderColor};
  background-color: ${props => props.bgColor};
  animation: ${props =>
    props.shake
      ? css`
          ${shake} 0.3s
        `
      : 'none'};
`

const Input = styled.input<InputProps>`
  flex: 1;
  &::placeholder {
    color: #cdcdcd;
  }
  height: 100%;
  outline: none;
  border: none;
  background-color: ${props => props.bgColor};
  font-size: 16px;
  letter-spacing: -0.04px;
  border: #cdcdcd;
`

export default InputField
