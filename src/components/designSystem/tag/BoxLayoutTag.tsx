import { palette } from '@/styles/palette'
import styled from '@emotion/styled'

interface BoxLayoutTagProps {
  text: React.ReactNode
  size?: 'small' | 'medium' | 'large'
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
  size,
  addStyle = {
    backgroundColor: `${palette.비강조4}`,
    padding: '4px 10px 4px 10px',
    color: `${palette.비강조}`,
    borderRadius: '20px',
    fontSize: '12px'
  }
}: BoxLayoutTagProps) => {
  const style = size
    ? size === 'large'
      ? {
          padding: '14px 24px',
          fontSize: '16px',
          height: '48px',
          borderRadius: '30px',
          border: `1px solid ${palette.keycolor}`,
          backgroundColor: palette.keycolorBG,
          color: palette.keycolor
        }
      : size === 'medium'
        ? {
            padding: '10px 20px',
            fontSize: '16px',
            height: '42px',
            borderRadius: '30px',
            border: `1px solid ${palette.keycolor}`,
            backgroundColor: palette.keycolorBG,
            color: palette.keycolor
          }
        : {
            padding: '8px 14px',
            fontSize: '14px',
            height: '33px',
            borderRadius: '16px',
            border: `1px solid ${palette.keycolor}`,
            backgroundColor: palette.keycolorBG,
            color: palette.keycolor
          }
    : addStyle
  return <Tag css={style}>{text}</Tag>
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
