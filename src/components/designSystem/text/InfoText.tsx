import CheckIcon from '@/components/icons/CheckIcon'
import InfoIcon from '@/components/icons/InfoIcon'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface InfoTextProps {
  hasError?: boolean
  success?: boolean
  children: React.ReactNode
  shake?: boolean
}

interface ContainerProps {
  color: string
  shake: boolean
}

// 사용법
// hasError: error 상태인지
// success: 검증을 통과한 상태인지
// children: text 부분
const InfoText = ({
  hasError = false,
  success = false,
  children,
  shake = false
}: InfoTextProps) => {
  const color = hasError ? '#ED1E1E' : success ? '#5DB21B' : '#ABABAB'

  return (
    <Container
      color={color}
      shake={shake}>
      {hasError ? (
        <InfoIcon color={color} />
      ) : success ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_3968_110)">
            <circle
              cx="7"
              cy="7"
              r="7"
              fill="#3E8D00"
            />
            <path
              d="M4 7L6.25 9L10 5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_3968_110">
              <rect
                width="14"
                height="14"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <InfoIcon color={color} />
      )}
      <span>{children}</span>
    </Container>
  )
}

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${props => props.color};
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  animation: ${props =>
    props.shake
      ? css`
          ${shake} 0.3s
        `
      : 'none'};
`

export default InfoText
