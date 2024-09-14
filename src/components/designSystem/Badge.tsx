import styled from '@emotion/styled'
interface BadgeProps {
  text: string
  addStyle?: {
    width?: string
    backgroundColor?: string
    color?: string
    boxShadow?: string
  }
}
// 사용 방식
{
  /* <BadgeProps
  text="단어"
  addStyle={{ backgroundColor: 'green', color: 'white' }}
/> */
}
// Dday에 쓰임.

const Badge = ({
  text,
  addStyle = {
    width: '60px',
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'rgba(255, 255, 255, 1)'
  }
}: BadgeProps) => {
  return <BadgeContainer css={addStyle}>{text}</BadgeContainer>
}

const BadgeContainer = styled.button`
  height: 23px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
  padding: 2px 10px;
`

export default Badge
