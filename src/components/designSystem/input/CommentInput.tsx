"use client";
import UpArrowIcon from "@/components/icons/UpArrowIcon";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { forwardRef, useEffect, useState } from "react";

interface CommentInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  setReset: () => void;
}

const CommentInput = forwardRef<HTMLTextAreaElement, CommentInputProps>(
  ({ setReset, placeholder, value, onChange }, ref) => {
    const [focused, setFocused] = useState(false);

    useEffect(() => {
      if (!focused) {
        if (value === "") {
          setReset();
        }
      }
    }, [focused, value]);
    return (
      <InputContainer focused={focused}>
        <Input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={ref}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <Button type="submit" canSubmit={value !== ""}>
          <UpArrowIcon />
        </Button>
      </InputContainer>
    );
  }
);

export default CommentInput;

const InputContainer = styled.div<{ focused: boolean }>`
  width: 100%;
  border-radius: 30px;
  box-shadow: 0 0 0 1px ${(props) => (props.focused ? palette.keycolor : palette.비강조3)} inset;
  display: flex;
  background-color: ${(props) => (props.focused ? palette.greenVariant : "white")};
  align-items: center;

  padding: 8px;
  min-height: 48px;
  max-height: 100px;
  height: auto;
  box-sizing: border-box;
`;
const Input = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  height: 32px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  font-family: Pretendard;
  padding: 5px 16px;
  resize: none;
  height: 32px;
  wrap: hard;
  overflow-y: auto; /* 내용이 넘칠 때 스크롤 생성 */
`;

const Button = styled.button<{ canSubmit: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) => (props.canSubmit ? palette.keycolor : palette.비강조3)};
`;
