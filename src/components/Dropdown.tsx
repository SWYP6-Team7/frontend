import { act, useState } from 'react'
import styled from '@emotion/styled'
interface DropdownProps {
  list: number[]
  value: number

  setValue: React.Dispatch<React.SetStateAction<number>>
}

const Dropdown = ({ list, value, setValue }: DropdownProps) => {
  const [active, setActive] = useState(false)

  return (
    <StyledSelectbox>
      <OptionListContainer active={active}>
        <StyledSelectedLabel
          value={value}
          onClick={() => setActive(!active)}>
          {value}
          {active ? (
            <img
              src="/images/dropDownUp.png"
              alt=""
            />
          ) : (
            <img
              src="/images/dropDown.png"
              alt=""
            />
          )}
        </StyledSelectedLabel>
        <StyledOptionList active={active}>
          {list.map((element: number) => (
            <StyledOptionItem
              key={element} // map을 쓰기 위해서는 해당 방식으로 key가 주어져야함.
              onClick={() => {
                // 클릭되면 active를 끄고 element로 선택된 값을 변경함.
                setActive(false)
                setValue(element)
              }}>
              {element}
            </StyledOptionItem>
          ))}
        </StyledOptionList>
      </OptionListContainer>
    </StyledSelectbox>
  )
}
export default Dropdown

export const StyledOptionItem = styled.li`
  padding: 10px 0px;
  transition: 0.3s;
  font-size: 16px;
  font-weight: 500;
`

// max-height를 통해 드롭다운이 열렸을 때 보이는 길이와 닫혔을때 안보이는 효과
const activeExist = ({ active = true }) => {
  return `${
    active
      ? `@media (max-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    height: 100px;
  }
  @media (min-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    height: 241px;
  }`
      : 'height:0'
  }`
}
const activeContainer = ({ active = true }) => {
  return `${
    active
      ? `@media (max-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    height: 160px;
  }
  @media (min-height: 777px) {
    // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
    height: 300px;
  }`
      : 'height: 52px'
  }`
}
const OptionListContainer = styled.div`
  transition: 0.2s ease-in-out;

  border-radius: 18px;
  border: 1px solid rgba(205, 205, 205, 1);
  width: 150px;
  padding-left: 20px;

  background-color: white;
  padding-right: 19px;
  ${activeContainer};
  // @media (max-height: 777px) {
  //   // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
  //   height: 160px;
  // }
  // @media (min-height: 777px) {
  //   // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
  //   height: 300px;
  // }
`
export const StyledOptionList = styled.ul`
  position: absolute; // absolute로 원하는 위치로.
  top: 2.6rem; // 그곳에 위에서부터 2.6rem(드롭다운본체의 크기)만큼 떨어진 곳.
  list-style-type: none; // ul을 커스텀할 때 필요한 부분.
  width: 119px; // 크기는 드롭다운 본체의 너비와 동일하게함.
  border-radius: 8px; // 동글동글하게 아래부분을 만들어야해서 border-radius를 줌.
  background: #ffffff; // 배경색
  ${activeExist};
  transition: 0.2s ease-in-out; // 0.2초를 걸려서 부드럽게 ul이 보이고 사라진다.
  overflow-y: scroll; // scroll을 통해 리스트 내용들을 보겠다.
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
  // @media (max-height: 777px) {
  //   // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
  //   height: 100px;
  // }
  // @media (min-height: 777px) {
  //   // 화면 높이가 많이 작을 때의 드롭다운 높이 설정
  //   height: 119px;
  // }
`

export const StyledSelectedLabel = styled.button`
  // display설정
  width: 100%;
  height: 52px;
  border: none;
  cursor: pointer;
  display: flex;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
`
export const StyledSelectbox = styled.div`
  position: relative;
  width: 150px;
  height: 3.6rem;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
`
