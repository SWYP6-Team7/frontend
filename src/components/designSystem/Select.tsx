import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes, useState } from 'react'
import SelectArrow from '../icons/SelectArrow'
import Spacing from '../Spacing'
import { palette } from '@/styles/palette'

interface SelectProps {
  list: string[]
  setValue: (element: string) => void
  value?: string | number
  noneValue?: string
}

// none value는 일종의 label값 같은 느낌
// value가 undefined인 초깃값일 때 보여주기 위한 값

const Select = ({ list, value, setValue, noneValue }: SelectProps) => {
  const [active, setActive] = useState(false)
  const changeValue = (element: string) => {
    setValue(element)
    setActive(false)
  }
  return (
    <>
      {active && <Background />}
      <Container>
        <OptionList active={active}>
          <Label
            value={value}
            onClick={() => setActive(!active)}>
            {value ? (
              value
            ) : (
              <div css={{ color: palette.비강조 }}>{noneValue}</div>
            )}
            <div css={{ transform: active ? 'rotate(180deg)' : 'rotate(0)' }}>
              <SelectArrow />
            </div>
          </Label>
          <StyledOptionList active={active}>
            {list.map((element: string) => {
              return (
                <div css={{ display: 'flex', gap: '7px' }}>
                  <StyledOptionItem
                    key={element} // map을 쓰기 위해서는 해당 방식으로 key가 주어져야함.
                    onClick={() => changeValue(element)}>
                    {element}
                  </StyledOptionItem>
                  <Spacing
                    direction="horizontal"
                    size={12}
                  />
                </div>
              )
            })}
          </StyledOptionList>
        </OptionList>
      </Container>
    </>
  )
}

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
`

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
  }`
}
const Container = styled.div`
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 1002;
  width: fit-content;
  border-radius: 20px;
  background-color: ${palette.BG};
  min-height: 44px;
  overflow: hidden;
  cursor: pointer;
`

const OptionList = styled.div<{ active: boolean }>`
  transition: 0.2s ease-in-out;
  border-radius: 20px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  border: 1px solid ${props => (props.active ? 'none' : palette.비강조3)};
  height: max-content;
  min-height: 44px;
  ${activeContainer};

  background-color: white;
`

const Label = styled.button`
  width: 100%;
  font-size: 16px;
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
`

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
      : 'max-height:0;'
  }`
}

const StyledOptionList = styled.ul<{ active: boolean }>`
  list-style-type: none; // ul을 커스텀할 때 필요한 부분.

  width: 100%;
  padding: 0 16px;
  height: inherit;
  font-weight: 16px;
  line-height: 20px;
  border-radius: 8px; // 동글동글하게 아래부분을 만들어야해서 border-radius를 줌.

  background-color: ${palette.BG};
  overflow-y: scroll;

  transition: 0.2s ease-in-out; // 0.2초를 걸려서 부드럽게 ul이 보이고 사라진다.
  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 1px;
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
    display: flex;
  }
`

const StyledOptionItem = styled.li`
  padding: 10px 0px;
  transition: 0.3s;
  font-size: 14px;
  font-weight: 500;
`

export default Select
