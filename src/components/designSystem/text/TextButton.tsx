'use client'
import RightVector from '@/components/icons/RightVector'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'

interface TextButtonProps {
  onClick?: (e:MouseEvent) => void
  text: React.ReactNode
  isRightVector: boolean
  rightText?: string
  isLeftVector: boolean
  leftIconSrc?: string
  titleWeight?: 'regular' | 'semibold'
}

const TextButton = ({
  onClick,
  isRightVector,
  text,
  rightText = '',
  leftIconSrc = '',
  isLeftVector,
  titleWeight = 'regular'
}: TextButtonProps) => {
  return (
    <Box onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {isLeftVector && (
          <img
            src={leftIconSrc === '' ? '/images/createTripBtn.png' : leftIconSrc}
            alt="icon"
          />
        )}
        <SmallTitle fontWeight={titleWeight}>{text}</SmallTitle>
      </div>
      <Right>
        {rightText !== '' && (
          <Value style={{ marginRight: '8px' }}>{rightText}</Value>
        )}
        {isRightVector && (
          <div style={{ padding: '8px 9px' }}>
            <RightVector />
          </div>
        )}
      </Right>
    </Box>
  )
}

export default TextButton

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  padding: 14px 8px;
  &:hover {
    background-color: ${palette.buttonHover};
  }
  transition: 0.2s ease-in-out;
  opacity: 0px;
  &:active {
    background-color: ${palette.buttonActive};
  }
`

const SmallTitle = styled.span<{ fontWeight: 'regular' | 'semibold' }>`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: ${props => (props.fontWeight === 'regular' ? '500' : '600')};
  line-height: 16px;
  letter-spacing: -0.25px;
  text-align: center;

  color: ${palette.기본};
`

const Value = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: ${palette.비강조};
  text-align: center;
`
const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
