import styled from '@emotion/styled'
interface BadgeProps {
  daysLeft: number
  addStyle?: {
    width?: string
    backgroundColor?: string
    color?: string
  }
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
  addStyle = {
    width: '60px',
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'rgba(255, 255, 255, 1)'
  }
}: BadgeProps) => {
  return <BadgeContainer css={addStyle}>마감 D-{daysLeft}</BadgeContainer>
}

const BadgeContainer = styled.div`
  height: 23px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Badge
