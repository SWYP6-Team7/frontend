import CheckIcon from '@/components/icons/CheckIcon'
import InfoIcon from '@/components/icons/InfoIcon'
import styled from '@emotion/styled'

interface InfoTextProps {
  hasError?: boolean
  success?: boolean
  children: React.ReactNode
}

interface ContainerProps {
  color: string
}

const InfoText = ({
  hasError = false,
  success = false,
  children
}: InfoTextProps) => {
  const color = hasError ? '#ED1E1E' : success ? '#5DB21B' : '#ABABAB'

  return (
    <Container color={color}>
      {hasError ? (
        <InfoIcon color={color} />
      ) : success ? (
        <CheckIcon
          status="done"
          size={14}
        />
      ) : (
        <InfoIcon color={color} />
      )}
      <span>{children}</span>
    </Container>
  )
}

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${props => props.color};
  font-size: 14px;
  line-height: 16px;
`

export default InfoText
