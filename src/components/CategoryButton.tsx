import styled from '@emotion/styled'
interface CategoryButtonProps {
  text?: string
  addStyle?: {
    backgroundColor?: string
    color?: string
    height?: string
    border?: string
  }
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
  addStyle = {
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'white',
    height: '42px',
    border: '1px solid var(--3, rgba(205, 205, 205, 1))'
  },
  onClick
}: CategoryButtonProps) => {
  return (
    <CategoryButtonContainer
      onClick={onClick}
      css={addStyle}>
      {text}
    </CategoryButtonContainer>
  )
}

const CategoryButtonContainer = styled.button`
  padding: 10px 20px 10px 20px;
  border-radius: 30px;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`
export default CategoryButton
