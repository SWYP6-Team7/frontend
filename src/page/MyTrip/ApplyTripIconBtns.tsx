'use client'
import CheckingModal from '@/components/designSystem/modal/CheckingModal'
import EditAndDeleteModal from '@/components/designSystem/modal/EditAndDeleteModal'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import FullHeartIcon from '@/components/icons/FullHeartIcon'
import MoreIcon from '@/components/icons/MoreIcon'
import { useUpdateBookmark } from '@/hooks/bookmark/useUpdateBookmark'
import { useMyApplyTrip } from '@/hooks/myTrip/useMyApplyTrip'
import { authStore } from '@/store/client/authStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

interface ApplyTripIconBtnsProps {
  bookmarked: boolean
  travelNumber: number
}
export default function ApplyTripIconBtns({
  bookmarked,
  travelNumber
}: ApplyTripIconBtnsProps) {
  const { accessToken, userId } = authStore()
  const [bookmarkModalOpen, setBookmarkModalOpen] = useState(false)
  const [bookmarkCancelClicked, setBookmarkCancelClicked] = useState(false)
  const [bookmarkCancelToast, setBookmarkCancelToast] = useState(false)

  //  내가 참가한 여행
  const { deleteMyApplyTripsMutation } = useMyApplyTrip()

  // 모달 관리.
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [checkingModalClicked, setCheckingModalClicked] = useState(false)
  const [threeDotsClick, setThreeDotsClick] = useState(false)
  const [isToastShow, setIsToastShow] = useState(false) // 삭제 완료 메시지.

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
        if (res?.data.status === 200) {
          setBookmarkCancelToast(true)
        }
      })
    }
  }, [bookmarked, bookmarkCancelClicked])

  //   내가 만든 여행 수정및 삭제

  useEffect(() => {
    if (isDeleteBtnClicked) {
      setIsResultModalOpen(true)
      setIsDeleteBtnClicked(false)
    }
    if (checkingModalClicked) {
      // 삭제 요청.
      deleteMyApplyTripsMutation(travelNumber).then(res => {
        if (res?.data.status === 200) {
          setIsToastShow(true)
        }
      })
    }
  }, [isDeleteBtnClicked, isEditBtnClicked, checkingModalClicked])

  const editOrDeleteClickHandler = () => {
    setThreeDotsClick(true)
    setBookmarkModalOpen(false)
  }

  return (
    <div>
      <HeartBtn style={{ display: 'flex' }}>
        {bookmarked ? (
          <div onClick={bookmarkClickHandler}>
            <FullHeartIcon
              width={24}
              height={21.4}
            />
          </div>
        ) : (
          <div onClick={bookmarkClickHandler}>
            <EmptyHeartIcon
              width={24}
              height={21.4}
              stroke={`${palette.비강조3}`}
            />
          </div>
        )}
        <div
          onClick={editOrDeleteClickHandler}
          style={{ marginLeft: '10px' }}>
          <MoreIcon stroke={palette.비강조2} />
        </div>
      </HeartBtn>
      {/* 만든 여행 삭제 관련 부분 */}

      <EditAndDeleteModal
        deleteText="여행 참가 취소"
        isMyApplyTrip={true}
        setIsEditBtnClicked={setIsEditBtnClicked}
        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
        isOpen={threeDotsClick}
        setIsOpen={setThreeDotsClick}
      />
      <CheckingModal
        isModalOpen={isResultModalOpen}
        modalMsg={`아쉬워요🥺\n 정말 여행을 취소하시겠어요? `}
        modalTitle="참가 취소"
        modalButtonText="취소하기"
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <ResultToast
        height={120}
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="여행 게시글이 삭제되었어요."
      />

      {/* 북마크 부분 */}
      <CheckingModal
        isModalOpen={bookmarkModalOpen && !threeDotsClick}
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
