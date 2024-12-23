import { palette } from '@/styles/palette'
import styled from '@emotion/styled'

interface BoxLayoutTagProps {
  text: React.ReactNode
  addStyle?: {
    backgroundColor?: string
    color?: string
    height?: string
    border?: string
    borderRadius?: string
    padding?: string
    fontSize?: string
  }
}
const BoxLayoutTag = ({
  text,
  addStyle = {
    backgroundColor: `${palette.비강조4}`,
    padding: '4px 10px 4px 10px',
    color: `${palette.비강조}`,
    borderRadius: '20px',
    fontSize: '12px'
  }
}: BoxLayoutTagProps) => {
  return <Tag css={addStyle}>{text}</Tag>
}

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  font-weight: 600;
  transition: all 0.1s ease;
`

export default BoxLayoutTag
