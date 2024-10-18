import CheckingModal from '@/components/designSystem/modal/CheckingModal'
import EditAndDeleteModal from '@/components/designSystem/modal/EditAndDeleteModal'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import AlarmIcon from '@/components/icons/AlarmIcon'
import EmptyHeartIcon from '@/components/icons/EmptyHeartIcon'
import FullHeartIcon from '@/components/icons/FullHeartIcon'
import MoreIcon from '@/components/icons/MoreIcon'
import { useUpdateBookmark } from '@/hooks/bookmark/useUpdateBookmark'
import useTripDetail from '@/hooks/tripDetail/useTripDetail'
import useCommunity from '@/hooks/useCommunity'
import { authStore } from '@/store/client/authStore'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CommunityHeader() {
  const { userId, accessToken } = authStore()
  const { communityNumber } = useParams<{ communityNumber: string }>()

  const navigate = useNavigate()
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [checkingModalClicked, setCheckingModalClicked] = useState(false)
  const [threeDotsClick, setThreeDotsClick] = useState(false)
  const [isToastShow, setIsToastShow] = useState(false) // 삭제 완료 메시지.

  const {
    community: { data, isLoading },
    removeMutation,
    remove
  } = useCommunity(Number(communityNumber))

  useEffect(() => {
    if (isDeleteBtnClicked) {
      setIsResultModalOpen(true)
      setIsDeleteBtnClicked(false)
    }
    if (isEditBtnClicked) {
      setThreeDotsClick(false)
      setIsEditBtnClicked(false)
      navigate(`community/edit/${communityNumber}`)
    }
    if (checkingModalClicked) {
      remove({ communityNumber: Number(communityNumber) })
    }
  }, [isDeleteBtnClicked, isEditBtnClicked, checkingModalClicked])

  useEffect(() => {
    if (removeMutation.isSuccess) {
      setIsToastShow(true)
      setTimeout(() => {
        navigate('/community')
      }, 1800)
    }
  }, [removeMutation.isSuccess])

  return (
    <Container>
      {data?.userNumber === userId && (
        <div onClick={() => navigate(`/notification`)}>
          <AlarmIcon
            size={23}
            stroke={palette.기본}
          />
        </div>
      )}

      {data?.userNumber === userId && (
        <div onClick={() => setThreeDotsClick(true)}>
          <MoreIcon />
        </div>
      )}
      <EditAndDeleteModal
        setIsEditBtnClicked={setIsEditBtnClicked}
        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
        isOpen={threeDotsClick}
        setIsOpen={setThreeDotsClick}
      />
      <CheckingModal
        isModalOpen={isResultModalOpen}
        modalMsg={`작성한 글을 삭제합니다.`}
        modalTitle="정말 삭제할까요?"
        modalButtonText="삭제하기"
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <ResultToast
        bottom="80px"
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="게시글이 삭제되었어요."
      />
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 17.5px;
`
