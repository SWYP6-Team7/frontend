import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import FullHeartIcon from '@/components/icons/FullHeartIcon'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import './Button.css'
import { tripDetailStore } from '@/store/client/tripDetailStore'

interface ApplyListButtonProps {
  nowEnrollmentCount: number
  text: string
  addStyle?: {
    backgroundColor?: string
    color?: string
    boxShadow?: string
    weight?: 'regular' | 'medium' | 'semiBold' | 'bold'
  }
  type?: 'button' | 'reset' | 'submit' | undefined
  children?: React.ReactNode
  disabled?: boolean
  bookmarked: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  bookmarkOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
// 사용 방식
{
  /* <Button
  text="이름"
  addStyle={{ backgroundColor: 'green', color: 'white' }}
/> */
}
// 다음, 로그인 등에 쓰이는 버튼.

const ApplyListButton = ({
  text = '다음',
  type = 'submit',
  addStyle = {
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'white',
    boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.14)',
    weight: 'semiBold'
  },
  onClick = () => {},
  bookmarkOnClick = () => {},
  disabled = false,
  nowEnrollmentCount,
  bookmarked = false
}: ApplyListButtonProps) => {
  const { hostUserCheck } = tripDetailStore()
  return (
    <ApplyListButtonWrapper>
      <button
        style={{ border: 'none', backgroundColor: 'transparent' }}
        onClick={bookmarkOnClick}>
        {bookmarked ? (
          <FullHeartIcon width={24} />
        ) : (
          <EmptyHeartIcon
            width={24}
            stroke={palette.기본}
          />
        )}
      </button>
      <ButtonContainer
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`Button--weight-${addStyle.weight}`}
        css={!disabled && addStyle}>
        {text}
        {!disabled && nowEnrollmentCount > 0 && hostUserCheck && (
          <AppliedPersonCircle>{nowEnrollmentCount}</AppliedPersonCircle>
        )}
      </ButtonContainer>
    </ApplyListButtonWrapper>
  )
}
const AppliedPersonCircle = styled.div`
  background-color: ${palette.BG};
  color: ${palette.keycolor};
  width: 16px;
  height: 16px;
  /* padding: 1px 5px 1px 4px; */
  gap: 10px;
  border-radius: 20px;
  opacity: 0px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ApplyListButtonWrapper = styled.div`
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
  align-items: center;
  background-color: ${props => props.disabled && 'rgba(220, 220, 220, 1)'};
  color: ${props => props.disabled && palette.비강조};
  border: none;
`

export default ApplyListButton
