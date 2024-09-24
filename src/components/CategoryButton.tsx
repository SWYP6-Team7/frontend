import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
// id 는 어느 버튼을 눌렀는지 확인하기 위한 값.
interface CategoryButtonProps {
  text?: string
  id: number
  addStyle?: {
    backgroundColor?: string
    color?: string
    height?: string
    border?: string
  }
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
// 사용 방식
{
  /* <CategoryButton
  addStyle={{ border: 'none', backgroundColor: 'green', color: ' white' }}
/> */
}

// 카테고리 버튼용.

const CategoryButton = ({
  text = '항목',
  id,
  active = false,
  addStyle = {
    backgroundColor: palette.검색창,
    color: palette.기본,
    height: '42px'
  },
  onClick
}: CategoryButtonProps) => {
  const activeStyle = {
    border: '1px solid rgba(62, 141, 0, 1)',
    height: '42px',
    color: palette.keycolor,
    backgroundColor: palette.keycolorBG,
    fontWeight: 600
  }
  return (
    <CategoryButtonContainer
      id={`${id}`}
      onClick={onClick}
      css={active ? activeStyle : addStyle}>
      {text}
    </CategoryButtonContainer>
  )
}

const CategoryButtonContainer = styled.button`
  padding: 10px 20px 10px 20px;
  border-radius: 30px;
  box-sizing: border-box;
  border: 1px;
  display: flex;
  color: rgba(52, 52, 52, 1);
  font-size: 16px;
  font-weight: 500;
  width: max-content;
  justify-content: center;
  align-items: center;
`
export default CategoryButton
