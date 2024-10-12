import CheckIcon from '@/components/icons/CheckIcon'
import XIcon from '@/components/icons/XIcon'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { FocusEventHandler, forwardRef, useState } from 'react'
import RemoveButton from './RemoveButton'
import { palette } from '@/styles/palette'

// React.InputHTMLAttributes<HTMLInputElement
// input element의 property 타입들도 상속받아서 사용할 수 있음
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  success?: boolean
  shake?: boolean
  height?: number
  showSuccessIcon?: boolean
  icon?: React.ReactNode
  showIcon?: boolean
  handleRemoveValue: () => void
}

interface ContainerProps {
  bgColor: string
  shake: boolean
  height: number
  borderColor: string
}

interface InputProps {
  bgColor: string
}

// forwardRef : 부모 컴포넌트에서 자식 컴포넌트 안의 DOM element에 접근하고 싶을 때 사용한다.
// 첫번째 generic으로 ref type, 두번째로 지정한 props type
// React.InputHTMLAttributes<HTMLInputElement> 이걸 줬기 때문에 input의 프로퍼티들도 props로 내려줄 수 있음

// 사용방법
// 기본적으로 input 사용하듯이 props 사용하면 됨
// onBlur와 onFocus 함수 추가 가능
// hasError: error 상태인지
// success: 검증을 통과한 상태인지
// shake: true로 바뀌면 0.3초동안 애니메이션 실행 (처음 true인채로 렌더링 되거나 false에서 true가 되는 순간에만 실행)
const InputField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      hasError = false,
      success = false,
      shake = false,
      icon = undefined,
      showSuccessIcon = true,
      handleRemoveValue,
      onFocus,
      showIcon = true,
      onBlur,
      height = 48,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    // 우선순위 1.에러가 있는지? 2. 포커싱 되어있는지
    const borderColor = hasError
      ? '#ED1E1E'
      : focused
        ? palette.keycolor
        : 'none'
    const bgColor = hasError
      ? '#FFF7F7'
      : focused
        ? 'rgba(252, 255, 250, 1)'
        : props.value === ''
          ? palette.검색창
          : '#F5F5F5'

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
        height={height}
        borderColor={borderColor}>
        {icon && <IconContainer>{icon}</IconContainer>}
        <Input
          bgColor={bgColor}
          ref={ref}
          aria-invalid={hasError}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        <div>
          {showIcon &&
            (success ? (
              focused ? (
                <RemoveButton onClick={handleRemoveValue} />
              ) : showSuccessIcon ? (
                <CheckIcon status="done" />
              ) : (
                <></>
              )
            ) : props.value === '' ? (
              showSuccessIcon ? (
                <CheckIcon />
              ) : (
                <></>
              )
            ) : (
              <RemoveButton onClick={handleRemoveValue} />
            ))}
        </div>
      </Container>
    )
  }
)

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
  height: ${props => props.height}px;
  padding: 0px 16px;
  border-radius: 50px;
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
  font-family: Pretendard;
  height: 100%;
  outline: none;
  font-weight: 500;
  border: none;
  background-color: ${props => props.bgColor};
  font-size: 16px;
  letter-spacing: -0.04px;
  border: #cdcdcd;
`

const IconContainer = styled.div`
  margin-right: 11px;
`

export default InputField
