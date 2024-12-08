import Warning from '@/components/icons/Warning'
import { errorStore } from '@/store/client/errorStore'
import { errorToastUI } from '@/store/client/toastUI'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect } from 'react'

export default function ErrorToast() {
  const { errorToastShow, setErrorToastShow } = errorToastUI()
  const { error, setIsMutationError } = errorStore()
  // 1초 후 다시 메시지가 아래로 내려감.
  useEffect(() => {
    if (errorToastShow) {
      setTimeout(() => {
        setErrorToastShow(false)
        setIsMutationError(false)
      }, 1500)
    }
  }, [errorToastShow])
  const noPageError = error?.message.includes('404')!
  return (
    <Container isShow={errorToastShow && !noPageError}>
      <ToastMsg height={50}>
        <Warning />
        <Text>{error?.message}</Text>
        {/* <Text>문제가 발생했습니다.</Text> */}
      </ToastMsg>
    </Container>
  )
}
const Container = styled.div<{ isShow: boolean }>`
  position: fixed;
  width: 100%;
  bottom: ${({ isShow }) =>
    isShow
      ? '250px'
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
  background-color: ${palette.기본};
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
