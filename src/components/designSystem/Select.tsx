"use client";
import styled from "@emotion/styled";
import { forwardRef, SelectHTMLAttributes, useEffect, useState } from "react";
import SelectArrow from "../icons/SelectArrow";
import Spacing from "../Spacing";
import { palette } from "@/styles/palette";
import { keyframes } from "@emotion/react";

interface SelectProps {
  id?: string;
  list: string[];
  setValue: (element: string) => void;
  value?: string | number;
  initOpen?: boolean;
  noneValue?: string;
  width?: "fit-content" | "100%";
}

// none value는 일종의 label값 같은 느낌
// value가 undefined인 초깃값일 때 보여주기 위한 값

const Select = ({ list, id, width = "fit-content", value, initOpen = false, setValue, noneValue }: SelectProps) => {
  const [active, setActive] = useState(initOpen);
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);
  const changeValue = (element: string) => {
    setValue(element);
    setActive(false);
  };

  useEffect(() => {
    if (active) {
      // active가 true일 때 각 항목에 대해 애니메이션 추가
      const timers: NodeJS.Timeout[] = [];
      const newAnimatedItems = Array(list.length).fill(false);

      list.forEach((_, index) => {
        timers.push(
          setTimeout(() => {
            newAnimatedItems[index] = true; // 애니메이션 시작
            setAnimatedItems([...newAnimatedItems]);
          }, index * 200) // 200ms 간격으로 각 항목 보이기
        );
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer)); // 클린업
      };
    } else {
      setAnimatedItems(Array(list.length).fill(false)); // active가 false일 경우 초기화
    }
  }, [active, list]);
  return (
    <AllContainer id={id}>
      {active && (
        <Background
          onClick={(e) => {
            e.preventDefault();
            setActive(false);
          }}
        />
      )}
      <Container width={width}>
        <OptionList active={active}>
          <Label value={value} onClick={() => setActive(!active)}>
            {value ? value : <div style={{ color: palette.비강조 }}>{noneValue}</div>}
            <div style={{ transform: active ? "rotate(180deg)" : "rotate(0)" }}>
              <SelectArrow />
            </div>
          </Label>
          <StyledOptionList active={active}>
            {list.map((element: string, index) => {
              return (
                <OptionItem>
                  <StyledOptionItem
                    key={element} // map을 쓰기 위해서는 해당 방식으로 key가 주어져야함.
                    onClick={() => changeValue(element)}
                    active={animatedItems[index]}
                  >
                    {element}
                  </StyledOptionItem>
                  <Spacing direction="horizontal" size={12} />
                </OptionItem>
              );
            })}
          </StyledOptionList>
        </OptionList>
      </Container>
    </AllContainer>
  );
};

const OptionItem = styled.div`
  display: flex;
  gap: 7px;
  padding: 0 16px;
  &:hover {
    background-color: ${palette.keycolorBG};
  }
`;

const Background = styled.div`
  pointer-events: auto;
  position: fixed;
  width: 100%;
  height: 100svh;
  z-index: 1001;
  top: 0;
  left: 0;
  right: 0;

  transition: 0.2s all ease-in-out;
  bottom: 0;
  background-color: rgba(26, 26, 26, 0.3);
  opacity: 0.8;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    height: 100svh;
    transform: translateX(-50%);
    overflow-x: hidden;
  }
`;

const activeContainer = ({ active = true }) => {
  return `${
    active
      ? `@media (max-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    max-height: 160px;
  }
  @media (min-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    max-height: 300px;
  }`
      : `max-height: 40px; 
      &::-webkit-scrollbar {
    display: none;
}`
  }`;
};

const AllContainer = styled.div``;

const Container = styled.div<{ width: "fit-content" | "100%" }>`
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 1002;
  width: ${(props) => props.width};
  border-radius: 20px;
  background-color: ${palette.BG};
  height: auto;
  cursor: pointer;
`;

const OptionList = styled.div<{ active: boolean }>`
  border-radius: 20px;
  border-bottom-left-radius: ${(props) => (props.active ? "0px" : "20px")};
  border-bottom-right-radius: ${(props) => (props.active ? "0px" : "20px")};
  &::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  z-index: 3;
  border: 1px solid ${(props) => (props.active ? "none" : palette.비강조3)};
  height: max-content;
  min-height: 44px;
  ${activeContainer};

  background-color: white;
`;

const Label = styled.button`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조};
  min-width: 95px;
  padding: 12px 16px;
  border: none;
  outline: none;
  cursor: pointer;
  min-height: 44px;
  gap: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const activeExist = ({ active = true }) => {
  return `${
    active
      ? `@media (max-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    max-height: 100px;
  }
  @media (min-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    max-height: 241px;
  }`
      : "max-height:0;"
  }`;
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledOptionList = styled.ul<{ active: boolean }>`
  list-style-type: none; // ul을 커스텀할 때 필요한 부분.
  width: 100%;
  position: absolute;
  max-height: ${({ active }) => (active ? "170px" : "0")};
  top: 43px;
  left: 0;
  right: 0;
  z-index: 5;
  padding-bottom: 4px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  border-radius: 20px; // 동글동글하게 아래부분을 만들어야해서 border-radius를 줌.
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  background-color: ${palette.BG};
  overflow-y: auto; // 스크롤이 필요할 때 나타나도록 설정

  transition: 0.2s max-height ease-in-out; // max-height로 애니메이션 효과 적용
  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    width: 1px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: flex;
  }
`;

const StyledOptionItem = styled.li<{ active: boolean }>`
  padding: 10px 0px;

  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => (active ? "scale(100%)" : "scale(0)")};
  font-size: 14px;
  width: 100%;
  &:nth-child(n) {
    transition:
      opacity 0.15s cubic-bezier(0.25, 1.5, 0.5, 1),
      transform 0.15s cubic-bezier(0.25, 1.5, 0.5, 1);
  }
  font-weight: 500;
`;

export default Select;
