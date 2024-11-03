import CheckIcon from '@/components/icons/CheckIcon'
import XIcon from '@/components/icons/XIcon'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { FocusEventHandler, forwardRef, useState } from 'react'
import RemoveButton from './RemoveButton'
import { palette } from '@/styles/palette'
import { BooleanLiteral } from 'typescript'

// React.InputHTMLAttributes<HTMLInputElement
// input element의 property 타입들도 상속받아서 사용할 수 있음
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleRemoveValue?: () => void
  icon?: React.ReactNode
  isRemove?: boolean
  success?: BooleanLiteral
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
// hasError: error 상태인지
// success: 검증을 통과한 상태인지
// shake: true로 바뀌면 0.3초동안 애니메이션 실행 (처음 true인채로 렌더링 되거나 false에서 true가 되는 순간에만 실행)
const CreateTripInputField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      icon,
      handleRemoveValue = () => {},
      isRemove = true,
      success = false,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    const borderColor = focused ? palette.keycolor : 'none'
    const bgColor = focused
      ? palette.greenVariant
      : props.value === ''
        ? palette.검색창
        : palette.비강조4

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
  border-radius: 18px;
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
  font-weight: 500;
  border: none;
  background-color: transparent;
  font-size: 16px;
  letter-spacing: -0.04px;
  border: #cdcdcd;
`

export default CreateTripInputField
