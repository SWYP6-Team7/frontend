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
  isDueDate = true,
  width = 'max-content',
  backgroundColor = 'rgba(62, 141, 0, 1)',
  color = 'rgba(255, 255, 255, 1)',
  borderRadius = '20px',
  height = '23px',
  fontWeight = '700'
}: BadgeProps) => {
  return (
    <>
      {isDueDate ? (
        <BadgeContainer
          css={{
            width,
            backgroundColor,
            color,
            borderRadius,
            height,
            fontWeight
          }}>
          {text}&nbsp;D-{daysLeft}
        </BadgeContainer>
      ) : (
        <BadgeContainer
          css={{
            width,
            backgroundColor,
            color,
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
  line-height: 14.32px;
  gap: 10px;
  text-align: center;
`

export default Badge
