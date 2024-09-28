import styled from '@emotion/styled'
interface ButtonProps {
  text: string
  addStyle?: {
    backgroundColor?: string
    color?: string
    boxShadow?: string
    fontWeight?: string
  }
  children?: React.ReactNode
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
// 사용 방식
{
  /* <Button
  text="이름"
  addStyle={{ backgroundColor: 'green', color: 'white' }}
/> */
}
// 다음, 로그인 등에 쓰이는 버튼.

const Button = ({
  text = '다음',
  addStyle = {
    backgroundColor: 'rgba(62, 141, 0, 1)',
    color: 'white',
    boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.14)',
    fontWeight: '700'
  },
  onClick = () => {},
  disabled = false,
  children
}: ButtonProps) => {
  return (
    <ButtonContainer
      disabled={disabled}
      onClick={onClick}
      css={addStyle}>
      {text}
      {children}
    </ButtonContainer>
  )
}

const ButtonContainer = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 40px;
  justify-content: center;
  font-size: 18px;
  padding: 10px 20px 10px 20px;
  display: flex;
  align-items: center;
`

export default Button
