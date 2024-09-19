import styled from '@emotion/styled'
import { forwardRef, SelectHTMLAttributes, useState } from 'react'
import SelectArrow from '../icons/SelectArrow'
import Spacing from '../Spacing'

interface SelectProps {
  list: string[]
  setValue: (element: string) => void
  value: string | number
}

const Select = ({ list, value, setValue }: SelectProps) => {
  const [active, setActive] = useState(false)
  const changeValue = (element: string) => {
    setValue(element)
    setActive(false)
  }
  return (
    <Container>
      <OptionList active={active}>
        <Label
          value={value}
          onClick={() => setActive(!active)}>
          {value}
          <div css={{ transform: active ? 'rotate(180deg)' : 'rotate(0)' }}>
            <SelectArrow />
          </div>
        </Label>
        <StyledOptionList active={active}>
          {list.map((element: string) => (
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
          ))}
        </StyledOptionList>
      </OptionList>
    </Container>
  )
}

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
      : 'max-height: 40px'
  }`
}
const Container = styled.div`
  position: relative;
  width: fit-content;
  border-radius: 8px;
  background: #ffffff;
  height: 40px;
  cursor: pointer;
`

const OptionList = styled.div<{ active: boolean }>`
  transition: 0.2s ease-in-out;
  border-radius: 18px;
  overflow-x: hidden;
  border: 1px solid #ababab;
  height: max-content;
  padding: 9px 0;
  ${activeContainer};

  background-color: white;
`

const Label = styled.button`
  width: 100%;
  font-size: 14px;
  padding: 0 16px;
  border: none;
  cursor: pointer;
  gap: 7px;
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

  border-radius: 8px; // 동글동글하게 아래부분을 만들어야해서 border-radius를 줌.
  margin-top: 10px;
  background-color: white;
  overflow-y: scroll;
  ${activeExist};
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
