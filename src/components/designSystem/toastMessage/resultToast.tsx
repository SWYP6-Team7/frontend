import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'
interface resultToastProps {
  isShow: boolean
  setIsShow:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((bool: boolean) => void)
  text: string
  bottom?: string
  height?: number
}

export default function ResultToast({
  bottom = '20px',
  isShow,
  setIsShow,
  height = 20,
  text
}: resultToastProps) {
  //   1초 후 다시 메시지가 아래로 내려감.
  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(false)
      }, 1500)
    }
  }, [isShow])
  return (
    <Container
      isShow={isShow}
      bottom={bottom}>
      <ToastMsg height={height}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            width="18"
            height="18"
            rx="9"
            fill="#FDFDFD"
          />
          <path
            d="M5.40002 9.23286L8.3329 12.1657L13.221 6.29999"
            stroke={palette.keycolor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Text>{text}</Text>
      </ToastMsg>
    </Container>
  )
}
const Container = styled.div<{ isShow: boolean; bottom: string }>`
  position: fixed;
  width: 100%;
  bottom: ${({ isShow, bottom }) =>
    isShow
      ? bottom
      : '-100px'}; /* Toast 위치: 나타날 때는 40px, 사라질 때는 아래로 사라짐 */
  transition:
    bottom 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
  opacity: ${({ isShow }) =>
    isShow ? 1 : 0}; /* 나타날 때는 투명도 1, 사라질 때는 0 */
  pointer-events: none; /* Toast는 클릭할 수 없도록함 */
  display: flex;
  justify-content: center;
  left: 0;
  z-index: 1000;
`
const ToastMsg = styled.div<{ height: number }>`
  position: absolute;
  bottom: ${(props: { height: number }) => props.height}px;
  height: 42px;
  border-radius: 20px;
  background-color: ${palette.keycolor};
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Text = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  margin-left: 8px;
`
