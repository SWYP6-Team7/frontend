import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { forwardRef } from 'react'
import { useLocation } from 'react-router-dom'

interface SearchFilterTagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  idx: number
  addStyle?: {
    backgroundColor?: string
    color?: string
    border?: string
    borderRadius?: string
    padding?: string
    fontWeight?: string
    fontSize?: string
  }
  disabled?: boolean
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
// 사용 방식
// idx 는
// 어느 버튼을 눌렀는지 확인하기 위해 id property에 넣는 값.
// 클릭했을 때, 해당 id를 이용해서, 배열의 해당 인덱스의 active 상태를 표현. active 상태를 나타내는 boolean 배열을 state로사용.
// button 사용하듯이 props 사용 가능.
// active 값으로 바탕색이 초록색이 됨.
{
  /* <SearchFilterTag
  idx={번호}
  addStyle={{ border: 'none', backgroundColor: 'green', color: ' white' }}
/> */
}

const SearchFilterTag = forwardRef<HTMLButtonElement, SearchFilterTagProps>(
  (
    {
      text,
      idx,
      active = false,
      onClick,
      disabled = false,
      addStyle = {
        backgroundColor: active ? palette.keycolorBG : palette.검색창,
        color: active ? palette.keycolor : palette.기본,
        border: active ? `1px solid ${palette.keycolor}` : 'none',
        borderRadius: '16px',
        padding: '8px 14px',
        fontWeight: '400',
        fontSize: '14px'
      },
      ...props
    },
    ref
  ) => {
    const { pathname } = useLocation()
    const isCreateTrip = pathname === '/createTripDetail'
    return (
      <SearchFilterTagContainer
        isCreateTrip={isCreateTrip}
        disabled={disabled}
        id={`${idx}`}
        onClick={onClick}
        css={addStyle}>
        {text}
      </SearchFilterTagContainer>
    )
  }
)

const SearchFilterTagContainer = styled.button<{ isCreateTrip: boolean }>`
  height: ${props => (props.isCreateTrip ? '42px' : 'auto')};
  line-height: ${props => (props.isCreateTrip ? '22.4px' : 'auto')};
  padding: 8px 14px;

  border-radius: 16px;
`
export default SearchFilterTag
