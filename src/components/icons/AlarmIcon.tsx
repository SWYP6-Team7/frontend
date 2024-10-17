import useNotification from '@/hooks/notification/useNotification'
import styled from '@emotion/styled'

interface AlarmProps {
  size?: number
  stroke?: string
}

const AlarmIcon = ({ size = 24, stroke = '#848484' }: AlarmProps) => {
  const { data } = useNotification()

  return (
    <Container size={size}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.1804 2.00364L11.6367 2.00002C8.11726 1.99175 5.06139 4.85134 5.03714 8.31679V14.4099C5.03714 15.2412 4.93126 16.0537 4.4777 16.7454L4.17563 17.2059C3.71692 17.9054 4.21017 18.8423 5.03714 18.8423H19.805C20.6319 18.8423 21.1252 17.9054 20.6664 17.2059L20.3644 16.7454C19.9108 16.0537 19.805 15.2412 19.805 14.4099V8.31679C19.764 4.85119 16.6999 2.01189 13.1804 2.00364Z"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.579 18.842C15.579 20.5861 14.1652 21.9999 12.4211 21.9999C10.677 21.9999 9.26318 20.5861 9.26318 18.842"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {data?.pages[0].content[0].isRead === false && <RedDot />}
    </Container>
  )
}

const Container = styled.div<{ size: number }>`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`

const RedDot = styled.div`
  background-color: #ea2a2a;
  position: absolute;
  top: -1px;
  right: -1px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
`
export default AlarmIcon
