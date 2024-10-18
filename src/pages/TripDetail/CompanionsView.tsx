import BottomModal from '@/components/BottomModal'
import PersonIcon from '@/components/icons/PersonIcon'
import Spacing from '@/components/Spacing'
import { palette } from '@/styles/palette'
import React, { useState } from 'react'
import Button from '@/components/Button'
import styled from '@emotion/styled'
import Vector from '@/components/icons/Vector'
import Calendar from '@/components/icons/Calendar'
import RoundedImage from '@/components/designSystem/profile/RoundedImage'
import BoxLayoutTag from '@/components/BoxLayoutTag'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import useTripDetail from '@/hooks/tripDetail/useTripDetail'
import { all } from 'axios'

interface CompanionsViewProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface Companion {
  userNumber: number
  userName: string
  ageGroup: string
  profileUrl: string
}

export default function CompanionsView({
  isOpen,
  setIsOpen
}: CompanionsViewProps) {
  const handleCloseModal = () => {
    setIsOpen(false)
  }
  const duedateSubmitHandler = () => {
    setIsOpen(false)
    // zustand에 채용 인원 및 성별 저장 로직 필수.
  }
  const {
    profileUrl,
    userName,
    userAgeGroup,
    nowPerson,
    maxPerson,
    travelNumber
  } = tripDetailStore()
  const { companions } = useTripDetail(travelNumber)
  const allCompanions = companions.data?.data.companions
  console.log(companions, '모집 인원들 ')
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = window.innerWidth.toString() + 'px'
  return (
    <>
      {isOpen && (
        <BottomModal
          initialHeight={window.innerHeight <= 700 ? 75 : 65} // height 비율이 짧아 진다면 58%로 맞추기.
          closeModal={handleCloseModal}>
          <ModalWrapper css={{ marginTop: '6px' }}>
            <ModalContainer css={{ padding: '0px 24px' }}>
              <OwnerBox>
                <Title>주최자</Title>

                <div>
                  <div>
                    <RoundedImage
                      size={64}
                      src={profileUrl}
                    />
                  </div>
                  <OwnerInfo>
                    <OwnerName>{userName}</OwnerName>
                    <BoxLayoutTag
                      text={userAgeGroup}
                      backgroundColor={palette.keycolorBG}
                      color={palette.keycolor}
                    />
                  </OwnerInfo>
                </div>
              </OwnerBox>
              <Line></Line>
              <PeopleBox>
                <Title>
                  모집 인원{' '}
                  <p
                    css={{
                      marginLeft: '4px',
                      fontWeight: '500',
                      color: palette.비강조2
                    }}>
                    ({nowPerson}/{maxPerson})
                  </p>
                </Title>
                <CompanionsBox>
                  {allCompanions?.map((person: Companion) => (
                    <OwnerBox
                      key={person.userName}
                      css={{ marginRight: '16px' }}>
                      <div>
                        <div>
                          <RoundedImage
                            size={64}
                            src={person?.profileUrl ? person?.profileUrl : ''}
                          />
                        </div>
                        <OwnerInfo>
                          <OwnerName>{person.userName}</OwnerName>
                          <BoxLayoutTag
                            text={person.ageGroup}
                            backgroundColor={palette.keycolorBG}
                            color={palette.keycolor}
                          />
                        </OwnerInfo>
                      </div>
                    </OwnerBox>
                  ))}
                </CompanionsBox>
              </PeopleBox>
            </ModalContainer>
          </ModalWrapper>
          <ButtonWrapper
            showModal={isOpen}
            width={newRightPosition}>
            <Button
              text="닫기"
              onClick={duedateSubmitHandler}
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
const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`
const OwnerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: ${palette.기본};
  margin-bottom: 4px;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  text-align: left;
  display: flex;
  align-items: center;
`
const CompanionsBox = styled.div`
  display: flex;
  margin-top: 16px;
  padding-left: 6px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const ModalWrapper = styled.div``
const ModalContainer = styled.div``

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
const OwnerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 64px;
`
const Line = styled.div`
  width: 100%;
  margin: 24px 0px;
  border: 1px solid ${palette.비강조4};
`
const PeopleBox = styled.div`
  margin-right: -24px;
`
