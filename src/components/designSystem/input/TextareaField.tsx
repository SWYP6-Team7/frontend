"use client";
import { useTextAreaScroll } from "@/hooks/createTrip/useInputScroll";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { FocusEventHandler, useRef, useState } from "react";

interface TextareaFieldProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  height?: number | string;
  padding?: string;
  fontSize?: string;
  lineHeight?: string;
  color?: string;
  isReport?: boolean;
  placeholderColor?: string;
}

const TextareaField = ({
  height = "31svh",
  padding = "16px",
  fontSize = "16px",
  lineHeight = "22px",
  isReport = false,
  placeholderColor = palette.비강조2,
  color = palette.기본,
  ...rest
}: TextareaFieldProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  useTextAreaScroll(textAreaRef);
  const borderColor = focused ? palette.keycolor : palette.검색창;
  const bgColor = focused ? palette.greenVariant : palette.검색창;

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    setFocused(true);
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    setFocused(false);
  };
  return (
    <DetailTextArea
      wrap="hard"
      borderColor={borderColor}
      bgColor={bgColor}
      onFocus={handleFocus}
      padding={padding}
      lineHeight={lineHeight}
      fontSize={fontSize}
      placeholderColor={placeholderColor}
      color={isReport && !focused ? placeholderColor : color}
      onBlur={handleBlur}
      height={height}
      ref={textAreaRef}
      {...rest}
    />
  );
};

const DetailTextArea = styled.textarea<{
  height: string | number;
  borderColor: string;
  bgColor: string;
  padding: string;
  fontSize: string;
  lineHeight: string;
  color: string;
  placeholderColor: string;
}>`
  width: 100%;
  color: ${(props) => props.color};
  height: ${(props) => (typeof props.height === "number" ? `${props.height}` : props.height)};
  padding: ${(props) => props.padding};
  font-family: "Pretendard" !important;
  background-color: ${(props) => props.bgColor};
  &::placeholder {
    color: ${(props) => props.placeholderColor};
    word-break: keep-all;
    font-size: ${(props) => props.fontSize};
    font-weight: 400;
    line-height: ${(props) => props.lineHeight};
    letter-spacing: -0.025em;
    font-family: "Pretendard" !important;
  }
  font-size: ${(props) => props.fontSize};
  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    // 부모와 동일하게 함(나중에 절전모드, 밤모드 추가되면 수정하기 번거로우니까... 미리 보이는 노동은 최소화)
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    // 동글동글한 회색 바를 만든다.
    border-radius: 1rem;

    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar-button:vertical:start:decrement,
  &::-webkit-scrollbar-button:vertical:start:increment {
    display: block;
    height: 10px;
  }
  &::-webkit-scrollbar-button:vertical:end:decrement,
  &::-webkit-scrollbar-button:vertical:end:increment {
    display: block;
    height: 10px;
  }
  line-height: ${(props) => props.lineHeight};
  letter-spacing: -0.025em;
  text-align: left;
  border-radius: 20px;
  border: 1px solid ${(props) => props.borderColor};
  outline: none;
  resize: none;
`;

export default TextareaField;
