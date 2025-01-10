import { useTextAreaScroll } from '@/hooks/createTrip/useInputScroll'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { FocusEventHandler, useRef, useState } from 'react'

interface TextareaFieldProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  height?: number | string
}

const TextareaField = ({ height = '31svh', ...rest }: TextareaFieldProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  useTextAreaScroll(textAreaRef)
  const borderColor = focused ? palette.keycolor : palette.검색창
  const bgColor = focused ? palette.greenVariant : palette.검색창

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = event => {
    setFocused(true)
  }

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = event => {
    setFocused(false)
  }
  return (
    <DetailTextArea
      borderColor={borderColor}
      bgColor={bgColor}
      onFocus={handleFocus}
      onBlur={handleBlur}
      height={height}
      ref={textAreaRef}
      {...rest}
    />
  )
}

const DetailTextArea = styled.textarea<{
  height: string | number
  borderColor: string
  bgColor: string
}>`
  width: 100%;
  height: ${props =>
    typeof props.height === 'number' ? `${props.height}` : props.height};
  padding: 16px;
  font-family: 'Pretandard', sans-serif;
  background-color: ${props => props.bgColor};
  &::placeholder {
    color: ${palette.비강조2};

    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px;
    letter-spacing: -0.025em;
  }
  font-size: 16px;
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
    height: 80px;
    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: left;
  border-radius: 20px;
  border: 1px solid ${props => props.borderColor};
  outline: none;
  resize: none;
`

export default TextareaField
