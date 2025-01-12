'use client'
import CheckingModal from '@/components/designSystem/modal/CheckingModal'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import FullHeartIcon from '@/components/icons/FullHeartIcon'
import { useUpdateBookmark } from '@/hooks/bookmark/useUpdateBookmark'
import { authStore } from '@/store/client/authStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

interface BookmarkIconBtnsProps {
  bookmarked: boolean
  travelNumber: number
}
export default function BookmarkIconBtns({
  bookmarked,
  travelNumber
}: BookmarkIconBtnsProps) {
  const { accessToken, userId } = authStore()
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false)
  const [bookmarkCancelClicked, setBookmarkCancelClicked] = useState(false)
  const [bookmarkCancelToast, setBookmarkCancelToast] = useState(false)
  const { postBookmarkMutation, deleteBookmarkMutation } = useUpdateBookmark(
    accessToken!,
    userId!,
    travelNumber
  )
  const bookmarkClickHandler = () => {
    if (bookmarked) {
      setBookmarkModalOpen(true)
    } else {
      // 북마크 추가.
      postBookmarkMutation()
    }
  }

  useEffect(() => {
    if (bookmarked && bookmarkCancelClicked) {
      deleteBookmarkMutation().then(res => {
        if (res?.data.status === 204) {
          setBookmarkCancelToast(true)
        }
      })
    }
  }, [bookmarked, bookmarkCancelClicked])

  return (
    <div>
      <HeartBtn
        style={{ display: 'flex' }}
        onClick={bookmarkClickHandler}>
        {bookmarked ? (
          <div>
            <FullHeartIcon
              width={24}
              height={21.4}
            />
          </div>
        ) : (
          <div>
            <EmptyHeartIcon
              width={24}
              height={21.4}
              stroke={`${palette.비강조3}`}
            />
          </div>
        )}
      </HeartBtn>
      <CheckingModal
        isModalOpen={bookmarkModalOpen}
        modalMsg={'북마크를 해제할까요?'}
        modalTitle="북마크 해제"
        modalButtonText="해제하기"
        setIsSelected={setBookmarkCancelClicked}
        setModalOpen={setBookmarkModalOpen}
      />
      <ResultToast
        height={120}
        isShow={bookmarkCancelToast}
        setIsShow={setBookmarkCancelToast}
        text="북마크가 해제되었어요."
      />
    </div>
  )
}
const HeartBtn = styled.div`
  position: absolute;
  top: 18px;
  right: 22px;
`
