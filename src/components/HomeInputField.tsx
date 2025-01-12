'use client'
import styled from '@emotion/styled'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const HomeInputField = ({ ...props }: InputProps) => {
  return (
    <Container>
      <Input {...props} />
    </Container>
  )
}
export default HomeInputField
const Container = styled.div``
const Input = styled.input`
  width: 100%;

  padding: 16px;
  gap: 10px;
  border-radius: 40px;
  border: 1px solid rgba(205, 205, 205, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  &::placeholder {
    color: rgba(132, 132, 132, 1);
    font-weight: 500;
    font-size: 16px;
    line-height: 15px;
    vertical-align: middle;
  }
`
