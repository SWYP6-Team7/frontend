import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
interface BadgeProps {
  daysLeft?: number
  text: string
  isDueDate?: boolean
  width?: string
  backgroundColor?: string
  color?: string
  borderRadius?: string
  height?: string
  fontWeight?: string
  isClose?: boolean
  padding?: string
}
// 사용 방식
{
  /* <BadgeProps
  daysLeft={num}
  addStyle={{ backgroundColor: 'green', color: 'white' }}
/> */
}
// Dday에 쓰임.

const Badge = ({
  daysLeft,
  text,
  isClose = false,
  isDueDate = true,
  width = 'max-content',
  backgroundColor = 'rgba(62, 141, 0, 1)',
  color = 'rgba(255, 255, 255, 1)',
  borderRadius = '20px',
  height = '23px',
  fontWeight = '700'
}: BadgeProps) => {
  const bgColor = isClose ? palette.비강조2 : backgroundColor
  const textColor = isClose ? 'white' : color

  return (
    <>
      {isDueDate ? (
        <BadgeContainer
          css={{
            width,
            backgroundColor: bgColor,
            color: textColor,
            borderRadius,
            height,
            fontWeight
          }}>
          {isClose ? (
            '마감'
          ) : (
            <>
              {text}&nbsp;D-{daysLeft}
            </>
          )}
        </BadgeContainer>
      ) : (
        <BadgeContainer
          css={{
            width,
            backgroundColor: bgColor,
            color: textColor,
            borderRadius,
            fontWeight,
            height
          }}>
          {text}
        </BadgeContainer>
      )}
    </>
  )
}

const BadgeContainer = styled.div`
  font-size: 12px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: max-content;
  line-height: 14.32px;
  gap: 10px;
  text-align: center;
`

export default Badge
