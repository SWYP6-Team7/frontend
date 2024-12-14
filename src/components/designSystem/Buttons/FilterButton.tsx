import ResetIcon from '@/components/icons/ResetIcon'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
interface FilterButtonProps {
  text: string
  addStyle?: {
    backgroundColor?: string
    color?: string
    boxShadow?: string
    fontWeight?: string
  }
  type?: 'button' | 'reset' | 'submit' | undefined
  children?: React.ReactNode
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  intializeOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
// 사용 방식
{
  /* <Button
  text="이름"
  addStyle={{ backgroundColor: 'green', color: 'white' }}
/> */
}
// 다음, 로그인 등에 쓰이는 버튼.

const FilterButton = ({
  text = '다음',
  type = 'submit',
  addStyle = {
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'white',
    boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.14)',
    fontWeight: '700'
  },
  onClick = () => {},
  intializeOnClick = () => {},
  disabled = false,
  children
}: FilterButtonProps) => {
  return (
    <FilterButtonWrapper>
      <button
        style={{ border: 'none', backgroundColor: 'transparent' }}
        onClick={intializeOnClick}>
        <ResetIcon />
      </button>
      <ButtonContainer
        type={type}
        disabled={disabled}
        onClick={onClick}
        css={!disabled && addStyle}>
        {text}
        {children}
      </ButtonContainer>
    </FilterButtonWrapper>
  )
}

const FilterButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 16px;
`
const ButtonContainer = styled.button<{ disabled: boolean }>`
  @media (max-width: 390px) {
    width: 100%;
  }
  @media (min-width: 390px) {
    width: 342px;
  }
  height: 48px;
  border-radius: 40px;
  cursor: pointer;
  justify-content: center;
  font-size: 18px;
  padding: 10px 20px 10px 20px;
  display: flex;
  font-weight: '700';
  align-items: center;
  background-color: ${props => props.disabled && 'rgba(220, 220, 220, 1)'};
  color: ${props => props.disabled && palette.비강조};
  border: none;
`

export default FilterButton
