import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import RoundedImage from '../designSystem/profile/RoundedImage'
import EllipsisIcon from '../icons/EllipsisIcon'
import EmptyHeartIcon from '../icons/EmptyHeartIcon'
import CommentIcon from '../icons/CommentIcon'
import { useNavigate } from 'react-router-dom'
import EditAndDeleteModal from '../designSystem/modal/EditAndDeleteModal'
import CheckingModal from '../designSystem/modal/CheckingModal'
import ResultToast from '../designSystem/toastMessage/resultToast'

const Comment = () => {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [checkingModalClicked, setCheckingModalClicked] = useState(false)

  const [isToastShow, setIsToastShow] = useState(false) // 삭제 완료 메시지.
  const [threeDotsClick, setThreeDotsClick] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (isDeleteBtnClicked) {
      setIsResultModalOpen(true)
      setIsDeleteBtnClicked(false)
    }
    if (isEditBtnClicked) {
      setThreeDotsClick(false)
      setIsEditBtnClicked(false)
      // navigate(`trip/edit/${travelNumber}`)
    }
    if (checkingModalClicked) {
      // 삭제 요청.
      // deleteTripDetailMutation().then(res => {
      //   console.log(res)
      //   if (res?.data.status === 205) {
      //     setIsToastShow(true)
      //     setTimeout(() => {
      //       navigate('/')
      //     }, 1800)
      //   }
      // })
    }
  }, [isDeleteBtnClicked, isEditBtnClicked, checkingModalClicked])
  return (
    <Container>
      <TopContainer>
        <RoundedImage
          size={32}
          src=""
        />
        <UserBox>
          <UserName>{'김모잉'}</UserName>

          <Dot>·</Dot>
          <Day>{3}일전</Day>
        </UserBox>
        <button onClick={() => setThreeDotsClick(true)}>
          <EllipsisIcon />
        </button>
      </TopContainer>
      <Content>
        미야가와 아침시장, 다카야마 진옥 산마치 전통 거리보존지구, 야요이바시,
        혼마치도리, 카페 백파이프(バグパイプ), 도서관 칸쇼칸
      </Content>
      <BottomContainer>
        <Like>
          <EmptyHeartIcon
            width={16}
            height={14}
            stroke={palette.비강조2}
          />
          <div>좋아요</div>
        </Like>
        <Reply>
          <CommentIcon />
          <div>답글달기</div>
        </Reply>
      </BottomContainer>
      <EditAndDeleteModal
        setIsEditBtnClicked={setIsEditBtnClicked}
        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
        isOpen={threeDotsClick}
        setIsOpen={setThreeDotsClick}
      />
      <CheckingModal
        isModalOpen={isResultModalOpen}
        modalMsg={`댓글을 삭제할까요?`}
        modalTitle="정말 삭제할까요?"
        modalButtonText="삭제하기"
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <ResultToast
        bottom="80px"
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="댓글이 삭제되었어요."
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${palette.비강조4};
`

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const Dot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.비강조3};
`

const UserBox = styled.div`
  display: flex;
  gap: 4px;
  flex: 1;
  align-items: center;
  color: ${palette.비강조};
  font-size: 12px;
  text-align: center;

  font-weight: 400;
`
const UserName = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;

  color: ${palette.기본};
`

const Day = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조2};
`

const Content = styled.div`
  padding: 4px 16px 10px 40px;

  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: -0.025em;
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding-left: 40px;
`

const Like = styled.button`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  display: flex;
  align-items: center;
  color: ${palette.비강조2};
  gap: 6px;
`
const Reply = styled.button`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  display: flex;
  align-items: center;
  color: ${palette.비강조2};
  gap: 6px;
`

export default Comment
