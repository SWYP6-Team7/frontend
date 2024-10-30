import BottomModal from '@/components/BottomModal'
import PersonIcon from '@/components/icons/PersonIcon'
import Vector from '@/components/icons/Vector'
import Spacing from '@/components/Spacing'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import RecruitingPickerView from './RecruitingPickerView'
import Button from '@/components/Button'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { useLocation } from 'react-router-dom'

export default function RecruitingWrapper() {
  const { pathname } = useLocation()
  const isCreateTripDetailPage = pathname === '/createTripDetail'
  const { maxPerson } = tripDetailStore()
  const [showModal, setShowModal] = useState(false)

  const [count, setCount] = useState(isCreateTripDetailPage ? 1 : maxPerson)
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const recruitingSubmitHandler = () => {
    setShowModal(false)
    // zustand에 채용 인원 및 성별 저장 로직 필수.
  }
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'
  return (
    <>
      <RecruitingContainer>
        <DetailTitle>모집 인원</DetailTitle>
        <RecruitingBtn onClick={e => setShowModal(true)}>
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <div>
              <PersonIcon
                stroke={palette.keycolor}
                width={24}
                height={20}
              />
            </div>
            <Count>{count}</Count>
          </div>
          <Vector />
        </RecruitingBtn>
      </RecruitingContainer>
      {showModal && (
        <BottomModal
          initialHeight={window.innerHeight <= 700 ? 58 : 50} // height 비율이 짧아 진다면 58%로 맞추기.
          closeModal={handleCloseModal}>
          <ModalWrapper css={{ marginTop: '6px' }}>
            <ModalContainer css={{ padding: '0px 24px' }}>
              <DetailTitle>모집 인원</DetailTitle>
              <Spacing size={40} />
              <RecruitingPickerView
                count={count}
                setCount={setCount}
              />
            </ModalContainer>
          </ModalWrapper>
          <ButtonWrapper
            showModal={showModal}
            width={newRightPosition}>
            <Button
              text="완료"
              onClick={recruitingSubmitHandler}
              addStyle={{
                backgroundColor: 'rgba(62, 141, 0, 1)',
                color: 'rgba(240, 240, 240, 1)',
                boxShadow: 'rgba(170, 170, 170, 0.1)'
              }}
            />
          </ButtonWrapper>
        </BottomModal>
      )}
    </>
  )
}

const ModalWrapper = styled.div``
const ModalContainer = styled.div``
const DetailTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  text-align: left;
  color: ${palette.기본};
  height: 25px;
  padding: 0px 6px;
  gap: 8px;
  opacity: 0px;
`
const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  margin-left: 8px;
  margin-right: 19px;
`

const RecruitingContainer = styled.div``
const RecruitingBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  width: 106px;
  height: 48px;
  padding: 12px 16px;
  gap: 0px;
  border-radius: 20px;
  border: 1px solid ${palette.비강조3};
  opacity: 0px;
`
const ButtonWrapper = styled.div<{ width: string; showModal: boolean }>`
  width: 390px;
  @media (max-width: 389px) {
    width: ${props => props.width};
  }
  @media (max-width: 450px) {
    width: ${props => props.width};
  }
  /* pointer-events: none; */
  position: fixed;
  /* top: 0; */
  bottom: 4.7svh;
  /* z-index: 1001; */

  /* margin-left: ${props => (props.showModal ? '0px' : '-24px')}; */
  padding: 0px 24px;
  z-index: 10;
`
