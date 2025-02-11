"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import {
  FocusEvent,
  FocusEventHandler,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface CodeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  refs: RefObject<(HTMLInputElement | null)[]>;
  onValueChange: (values: string[]) => void;
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const CodeInput = ({ refs, onBlur, onFocus, onValueChange, ...props }: CodeInputProps) => {
  const [focused, setFocused] = useState(-1);
  const bgColor = focused >= 0 ? palette.greenVariant : props.value === "" ? palette.검색창 : palette.비강조4;
  const borderColor = focused >= 0 ? palette.keycolor : bgColor;

  const isValidIndex = (index: number): boolean => {
    return index >= 0 && index < 6;
  };

  const updateValues = () => {
    if (!refs.current) return;
    const newValues = refs.current.map((input) => input?.value || "");
    onValueChange(newValues);
  };

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>, index: number) => {
      event.stopPropagation();
      setFocused(index);

      onFocus?.(event);
    },
    [focused]
  );

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(-1);
    onBlur?.(event);
  };

  const handleInput = (e: FormEvent<HTMLInputElement>, index: number) => {
    if (!refs.current) return;

    const currentInput = refs.current[index];
    if (currentInput?.value && isNaN(parseInt(currentInput?.value))) {
      currentInput.value = "";
      return;
    }
    if (currentInput && currentInput?.value.length > 1) {
      currentInput.value = currentInput.value[currentInput?.value.length - 1];
    }

    if (currentInput?.value.length === 1 && isValidIndex(index + 1)) {
      refs.current[index + 1]?.focus();
    }
    updateValues();
  };

  const clickContainer = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const firstEmptyRef = refs.current?.find((ref) => ref?.value === "");
    if (firstEmptyRef) {
      firstEmptyRef.focus();
    } else {
      // 빈 값이 없으면 원래 클릭한 input에 포커스
      refs.current[refs.current.length - 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (!refs.current) return;

    const currentInput = refs.current[index];

    if (e.key === "Backspace" && currentInput?.value === "") {
      e.preventDefault();
      if (isValidIndex(index - 1)) {
        const prevInput = refs.current[index - 1];
        if (prevInput) {
          prevInput.value = "";
        }
        prevInput?.focus();
      }
    }
    updateValues();
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6 - index);

    if (!refs.current || !pastedData) return;

    [...pastedData].forEach((char, i) => {
      const targetIndex = index + i;
      if (isValidIndex(targetIndex)) {
        const input = refs.current[targetIndex];
        if (input) {
          input.value = char;
        }
      }
    });
    updateValues();
    refs.current[Math.min(pastedData.length + index, 5)]?.focus();
  };

  return (
    <Container bgColor={bgColor} borderColor={borderColor} onClick={clickContainer}>
      {[...Array(6)].map((_, index) => (
        <InputContainer key={index}>
          <StyledLabel>
            <Input
              placeholder=""
              onBlur={handleBlur}
              onFocus={(e) => handleFocus(e, index)}
              {...props}
              id={String(index)}
              ref={(el) => {
                if (refs.current) {
                  refs.current[index] = el;
                }
              }}
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
            />
            <Bar className="input-bar" />
          </StyledLabel>
        </InputContainer>
      ))}
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
  height: 48px;
  padding: 0px 16px;
  border-radius: 50px;
  overflow-x: hidden;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.borderColor};
  background-color: ${(props) => props.bgColor};
`;

const InputContainer = styled.div`
  width: 40px;
  height: 42px;
`;

const StyledLabel = styled.label`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

const Bar = styled.div`
  width: 16px;
  height: 3px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  display: block;
  left: 50%;
  background-color: ${palette.비강조3};
  border-radius: 3px;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  text-align: center;
  height: 100%;
  border: none;
  font-weight: 600;
  outline: none;
  display: block;
  font-size: 30px;
  line-height: 16px;
  color: #000;
  letter-spacing: -0.025em;
  background-color: transparent;
  &::placeholder {
    opacity: 0;
  }
  &:not(:placeholder-shown) ~ .input-bar,
  &:focus ~ .input-bar {
    display: none;
  }
`;

export default CodeInput;
