import styled from '@emotion/styled'
interface BadgeProps {
  daysLeft: number
  text: string

  width?: string
  backgroundColor?: string
  color?: string
  borderRadius?: string
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
  width = 'max-content',
  backgroundColor = 'rgba(62, 141, 0, 1)',
  color = 'rgba(255, 255, 255, 1)',
  borderRadius = '20px'
}: BadgeProps) => {
  return (
    <BadgeContainer css={{ width, backgroundColor, color, borderRadius }}>
      {text} D-{daysLeft}
    </BadgeContainer>
  )
}

const BadgeContainer = styled.div`
  height: 23px;
  font-weight: 700;
  font-size: 12px;
  padding: 3px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 14.32px;
`

export default Badge
