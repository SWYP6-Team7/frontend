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
    backgroundColor: 'white',
    color: 'black',
    height: '42px',
    border: '1px solid var(--3, rgba(205, 205, 205, 1))'
  },
  onClick
}: CategoryButtonProps) => {
  const activeStyle = {
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'white',
    border: '1px solid rgba(62, 141, 0, 1)',
    height: '42px'
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
  display: flex;
  font-size: 16px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`
export default CategoryButton
