'use client'
import useKeyboardResizeEffect from '@/hooks/useKeyboardResizeEffect'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import UpArrowIcon from '../icons/UpArrowIcon'
import { commentStore } from '@/store/client/commentStore'
import useComment from '@/hooks/comment/useComment'
import ResultToast from '../designSystem/toastMessage/resultToast'
import { isGuestUser } from '@/utils/user'
import { useRouter } from 'next/navigation'

interface CommentFormProps {
  paddingBottom?: number
  paddingTop?: number
  relatedType: 'travel' | 'community'
  relatedNumber: number
}

const CommentForm = ({
  paddingBottom = 40,
  paddingTop = 16,
  relatedType,
  relatedNumber
}: CommentFormProps) => {
  const { isEdit, edit, parentNumber, commentNumber, setReset, isReply } =
    commentStore()
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [isToastShow, setIsToastShow] = useState(false)
  const [value, setValue] = useState('')
  const { post, postMutation, updateMutation, update } = useComment(
    relatedType,
    relatedNumber
  )
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (inputRef.current) {
      inputRef.current.style.height = '32px'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 84)}px` // 내용에 맞게 높이 조정, 최대 100px
    }
    setValue(e.target.value)
  }
  useKeyboardResizeEffect()
  console.log(value, 'value')
  useEffect(() => {
    if (inputRef?.current) {
      if (isEdit && edit !== '') {
        console.log('eidt', edit)
        setValue(edit)
        inputRef.current.focus()
      }
      if (isReply) {
        inputRef.current.focus()
      }
    }
  }, [isEdit, isReply])

  useEffect(() => {
    if (!focused) {
      if (value === '') {
        setReset()
      }
    }
  }, [focused, value])

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === '') {
      return
    }

    if (isEdit) {
      if (!commentNumber) {
        return
      }
      update({ content: value, commentNumber })
      if (updateMutation.isSuccess) setIsToastShow(true)
    } else {
      post({ content: value, parentNumber })
    }
    setValue('')
    setReset()
  }

  return isGuestUser() ? (
    <Container
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      onClick={() => router.push('/login')}>
      <InputContainer focused={false}>
        <Input
          placeholder="로그인 후 댓글을 달아보세요."
          readOnly
        />
        <Button canSubmit={false}>
          <UpArrowIcon />
        </Button>
      </InputContainer>
    </Container>
  ) : (
    <Container
      onSubmit={submitComment}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}>
      <InputContainer focused={focused}>
        <Input
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={inputRef}
          placeholder={
            isGuestUser()
              ? '댓글을 입력해주세요.'
              : '로그인 후 댓글을 달아보세요.'
          }
          onChange={handleInput}
          value={value}
        />
        <Button
          type="submit"
          canSubmit={value !== ''}>
          <UpArrowIcon />
        </Button>
      </InputContainer>
      <ResultToast
        bottom="80px"
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="댓글이 수정되었어요."
      />
    </Container>
  )
}

const Container = styled.form<{
  paddingBottom: number
  paddingTop: number
}>`
  display: flex;
  align-items: center;
  left: 0;
  bottom: 0;
  @media (max-width: 440px) {
    width: 100svw;
  }
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;

    transform: translateX(-50%);
  }

  position: fixed;
  padding: 0 24px;
  background-color: white;
  padding-top: ${props => Math.abs(props.paddingTop / 844) * 100}svh;
  padding-bottom: ${props => Math.abs(props.paddingBottom / 844) * 100}svh;
  width: 100%;
`
const InputContainer = styled.div<{ focused: boolean }>`
  width: 100%;
  border-radius: 30px;
  border: 1px solid
    ${props => (props.focused ? palette.keycolor : palette.비강조3)};
  display: flex;
  background-color: ${props =>
    props.focused ? palette.greenVariant : 'white'};
  align-items: center;

  padding: 8px;
  min-height: 48px;
  max-height: 100px;
  height: auto;
  box-sizing: border-box;
`
const Input = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  height: 32px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  font-family: Pretendard;
  padding: 5px 16px;
  resize: none;
  height: 32px;
  overflow-y: auto; /* 내용이 넘칠 때 스크롤 생성 */
`

const Button = styled.button<{ canSubmit: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props =>
    props.canSubmit ? palette.keycolor : palette.비강조3};
`

export default CommentForm
