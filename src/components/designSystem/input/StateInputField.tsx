"use client";
import CheckIcon from "@/components/icons/CheckIcon";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FocusEventHandler, forwardRef, useState } from "react";
import RemoveButton from "./RemoveButton";
import { palette } from "@/styles/palette";

// React.InputHTMLAttributes<HTMLInputElement
// input element의 property 타입들도 상속받아서 사용할 수 있음
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  success?: boolean;
  shake?: boolean;
  height?: number;
  showSuccessIcon?: boolean;
  showIcon?: boolean;
  handleRemoveValue: () => void;
}

interface ContainerProps {
  bgColor: string;
  shake: boolean;
  height: number;
  borderColor: string;
}

interface InputProps {
  bgColor: string;
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
// icon: input 내에 icon 컴포넌트
// showIcon: 우측 상호작용을 보여줄 건지
// height: InputField의 높이 설정
const StateInputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      hasError = false,
      success = false,
      shake = false,
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
    const [focused, setFocused] = useState(false);

    const SuccessIcon = showSuccessIcon ? CheckIcon : React.Fragment;
    // 우선순위 1.에러가 있는지? 2. 포커싱 되어있는지

    const bgColor = hasError
      ? palette.errorVariant
      : focused
        ? palette.greenVariant
        : props.value === ""
          ? palette.검색창
          : "#F5F5F5";
    const borderColor = hasError ? palette.errorBorder : focused ? palette.keycolor : bgColor;
    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      onFocus?.(event);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      onBlur?.(event);
    };
    // margin같은 속성은 유동적으로 나타나는 애들한테 주는게 좋음
    return (
      <Container shake={shake} bgColor={bgColor} height={height} borderColor={borderColor}>
        <Input
          bgColor={bgColor}
          ref={ref}
          aria-invalid={hasError}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        <div style={{ boxSizing: "border-box" }}>
          {showIcon &&
            (success ? (
              focused ? (
                <RemoveButton onClick={handleRemoveValue} />
              ) : (
                <SuccessIcon status="done" />
              )
            ) : props.value === "" ? (
              <SuccessIcon />
            ) : (
              <RemoveButton onClick={handleRemoveValue} />
            ))}
        </div>
      </Container>
    );
  }
);

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${(props) => props.height}px;
  padding: 0px 16px;
  border-radius: 50px;
  overflow-x: hidden;
  box-sizing: border-box;

  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.bgColor};
  animation: ${(props) =>
    props.shake
      ? css`
          ${shake} 0.3s
        `
      : "none"};
`;

const Input = styled.input<InputProps>`
  flex: 1;
  width: 100%;
  &::placeholder {
    color: #cdcdcd;
    font-weight: 300;
  }
  font-family: Pretendard;
  height: 100%;
  outline: none;
  font-weight: 400;
  border: none;
  background-color: ${(props) => props.bgColor};
  font-size: 16px;
  letter-spacing: -0.04px;
  border: #cdcdcd;
`;
export default StateInputField;
