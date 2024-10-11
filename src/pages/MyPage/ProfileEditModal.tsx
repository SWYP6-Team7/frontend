import BottomModal from '@/components/BottomModal'
import Button from '@/components/Button'
import ButtonContainer from '@/components/ButtonContainer'
import CameraIcon from '@/components/icons/CameraIcon'
import CameraIconForUploadMypage from '@/components/icons/CameraIconForUploadMypage'
import PictureIcon from '@/components/icons/PictureIcon'
import ProfileRemoveIcon from '@/components/icons/ProfileRemoveIcon'
import Spacing from '@/components/Spacing'
import useMyPage from '@/hooks/myPage/useMyPage'
import { myPageStore } from '@/store/client/myPageStore'
import { palette } from '@/styles/palette'
import { isDefaultProfile } from '@/utils/profileUrl'
import styled from '@emotion/styled'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ModalProps {
  showModal: boolean

  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface FileData {
  lastModified: number
  name: string
  size: number
  type: string
}

export default function ProfileEditModal({
  showModal,
  setShowModal
}: ModalProps) {
  const { uploadMyProfileImgMutation, profileImage, isLoadingImage } =
    useMyPage()
  const { profileUrl, addIsProfileImgUpdated } = myPageStore()
  const [image, setImage] = useState<FileData | null>()
  const [showImage, setShowImage] = useState(profileUrl)
  const [changed, setChanged] = useState(false)
  const navigate = useNavigate()
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const profileSaveHandler = () => {
    // 프로필 저장.
    addIsProfileImgUpdated(true)

    setShowModal(false)
  }
  console.log(profileUrl, '이미지 url')
  const addImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      // post 요청 보내기.
      const formData = new FormData() // 폼데이터 생성
      formData.append('file', event.target.files[0])
      // post 요청 후 받은 url로 보여주기

      uploadMyProfileImgMutation(formData)
        .then(res => {
          setShowImage(res.url)
          setChanged(true)
        })
        .catch(e => {
          console.log(e, '커스텀 프로필 업로드 에러')
        })

      console.log(event.target.files[0])
    }
  }

  const handleDefaultProfileUpload = async (src: string, filename: string) => {
    try {
      // 이미지 URL (public 폴더에 있는 이미지 경로)
      const imageUrl = src // ex:'/images/default.png'

      // fetch를 이용해 이미지를 불러온 후 Blob으로 변환
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // FormData 생성 및 Blob 추가
      const formData = new FormData()
      formData.append('file', blob, filename)

      // axios로 서버에 전송
      uploadMyProfileImgMutation(formData)
      setChanged(true)
    } catch (error) {
      console.log('기본 프로필 업로드 오류')
    }
  }
  const check = (url: string) => {
    return profileUrl.includes(url)
  }

  return (
    <BottomModal
      initialHeight={window.innerHeight <= 700 ? 60 : 50} // height 비율이 짧아 진다면 58%로 맞추기.
      closeModal={handleCloseModal}>
      <ModalWrapper css={{ marginTop: '6px' }}>
        <ModalContainer css={{ padding: '0px 24px' }}>
          <DetailTitle>프로필 이미지를 선택해 주세요</DetailTitle>
          <Spacing size={32} />
          <ProfileContainer>
            <ShowImg isCustomImg={!isDefaultProfile(profileUrl)}>
              <input
                onChange={event => addImageFile(event)}
                type="file"
                id="imageInput"
                accept="image/*"
                css={{ display: 'none' }}
              />
              {showImage !== '' && !isDefaultProfile(profileUrl) && (
                <img
                  src={showImage}
                  css={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    position: 'absolute'
                  }}
                />
              )}
              <PictureIcon />
              {!isDefaultProfile(profileUrl!) && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: '0px', top: '0px' }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </ShowImg>
            <DefaultProfile isSelected={check('defaultProfile')}>
              <Profile
                onClick={() =>
                  handleDefaultProfileUpload(
                    '/images/defaultProfile.png',
                    'defaultProfile.png'
                  )
                }
                src="/images/defaultProfile.png"
                alt=""
              />
              {check('defaultProfile') && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: 0, top: 0 }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </DefaultProfile>
            <DefaultProfile isSelected={check('defaultProfile3')}>
              <Profile
                onClick={() =>
                  handleDefaultProfileUpload(
                    '/images/defaultProfile3.png',
                    'defaultProfile3.png'
                  )
                }
                src="/images/defaultProfile3.png"
                alt=""
              />
              {check('defaultProfile3') && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: 0, top: 0 }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </DefaultProfile>
            <DefaultProfile isSelected={check('defaultProfile5')}>
              <Profile
                onClick={() =>
                  handleDefaultProfileUpload(
                    '/images/defaultProfile5.png',
                    'defaultProfile5.png'
                  )
                }
                src="/images/defaultProfile5.png"
                alt=""
              />
              {check('defaultProfile5') && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: 0, top: 0 }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </DefaultProfile>
          </ProfileContainer>
          <ProfileContainer css={{ marginTop: '16px' }}>
            <UploadImg htmlFor="imageInput">
              <CameraIconForUploadMypage />
            </UploadImg>
            <DefaultProfile isSelected={check('defaultProfile2')}>
              <Profile
                onClick={() =>
                  handleDefaultProfileUpload(
                    '/images/defaultProfile2.png',
                    'defaultProfile2.png'
                  )
                }
                src="/images/defaultProfile2.png"
                alt=""
              />
              {check('defaultProfile2') && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: 0, top: 0 }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </DefaultProfile>
            <DefaultProfile isSelected={check('defaultProfile4')}>
              <Profile
                onClick={() =>
                  handleDefaultProfileUpload(
                    '/images/defaultProfile4.png',
                    'defaultProfile4.png'
                  )
                }
                src="/images/defaultProfile4.png"
                alt=""
              />
              {check('defaultProfile4') && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: 0, top: 0 }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </DefaultProfile>
            <DefaultProfile isSelected={check('defaultProfile6')}>
              <Profile
                onClick={() =>
                  handleDefaultProfileUpload(
                    '/images/defaultProfile6.png',
                    'defaultProfile6.png'
                  )
                }
                src="/images/defaultProfile6.png"
                alt=""
              />
              {check('defaultProfile6') && (
                <div
                  onClick={() => setShowImage('')}
                  css={{ position: 'absolute', right: 0, top: 0 }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </DefaultProfile>
          </ProfileContainer>
          <div css={{ marginTop: '16px' }}></div>
        </ModalContainer>
      </ModalWrapper>
      <ButtonContainer>
        <Button
          disabled={!changed}
          text="저장"
          onClick={profileSaveHandler}
          addStyle={{
            backgroundColor: 'rgba(62, 141, 0, 1)',
            color: 'rgba(240, 240, 240, 1)',
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonContainer>
    </BottomModal>
  )
}
// 프로필 사진 부분
const ProfileContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`
const DefaultProfile = styled.div<{ isSelected: boolean }>`
  position: relative;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: ${props =>
    props.isSelected ? `2px solid ${palette.keycolor}` : 'none'};
`
const Profile = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
`
const ShowImg = styled.div<{ isCustomImg: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 72px;
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: ${palette.비강조4};
  border-radius: 50%;
  border: ${props =>
    props.isCustomImg ? `2px solid ${palette.keycolor}` : 'none'};
`
const UploadImg = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 72px;
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: ${palette.비강조4};
  border-radius: 50%;
`
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
