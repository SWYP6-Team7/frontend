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
  const {
    updateProfileImgMutation,
    isUpdateProfileImgSuccess,
    updateDefaultProfileImgMutation,
    isUpdateDefaultProfileImgSuccess,
    deleteMyProfileImgMutation,
    isDeleteSuccessProfileImg
  } = useMyPage()
  const { profileUrl, addIsProfileImgUpdated } = myPageStore()
  const [image, setImage] = useState<FileData | null>()
  const [clickedSave, setClickedSave] = useState(false)

  // 일단 업로드를 하면, 저장할 용도 (추후에 미리보기 api 추가 되면 수정 예정.)
  const [fileImg, setFileImg] = useState<FormData>(new FormData())

  const [showImage, setShowImage] = useState(profileUrl)
  const ret = isDefaultProfile(profileUrl)
  const [active, setActive] = useState(
    ret.length === 0
      ? 'custom'
      : ret[0][ret[0].length - 5] === 'e'
        ? 1
        : +ret[0][ret[0].length - 5]
  )
  // 이미지를 띄어야하는 경우. 여부를 표시.
  const [isCustomImgUpload, setIsCustomImgUpload] = useState(
    ret.length === 0 ? true : false
  )
  const [changed, setChanged] = useState(false)
  const navigate = useNavigate()
  const handleCloseModal = () => {
    setShowModal(false)
  }
  console.log(profileUrl, active)
  const profileSaveHandler = () => {
    // 프로필 저장. 실제 update api 요청.
    if (active !== 'custom') {
      handleDefaultProfileUpload(active as number)
    }
    // else {
    //   // 커스텀 형태라면.
    //     updateProfileImgMutation(fileImg)
    //       .then(res => {
    //         console.log('프로필 업데이트 후, res', res)
    //         setShowImage(res.url)
    //         setChanged(true)
    //       })
    //       .catch(e => {
    //         console.log(e, '커스텀 프로필 업로드 에러')
    //       })

    // }
    addIsProfileImgUpdated(true)

    setShowModal(false)
    // setClickedSave(true)
  }
  console.log(profileUrl, '이미지 url')

  // 미리보기로 교체 예정.
  const addImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    setActive('custom')
    if (event.target.files !== null) {
      // post 요청 보내기.
      const formData = new FormData() // 폼데이터 생성
      formData.append('file', event.target.files[0])
      // post 요청 후 받은 url로 보여주기
      setFileImg(formData)

      //이 아래 부분은 미리보기 추가 되면 지울고 미리보기 api로 교체 예정.
      updateProfileImgMutation(formData)
        .then(res => {
          console.log('프로필 업데이트 후, res', res)
          setShowImage(res.url)
          setChanged(true)
          setIsCustomImgUpload(true)
        })
        .catch(e => {
          console.log(e, '커스텀 프로필 업로드 에러')
        })

      console.log(event.target.files[0])
    }
  }
  console.log(showImage, '현재 이미지')

  const handleDefaultProfileUpload = async (defaultNumber: number) => {
    try {
      // axios로 서버에 전송
      updateDefaultProfileImgMutation(defaultNumber)
    } catch (error) {
      console.log('기본 프로필 업로드 오류')
    }
  }
  const check = (url: string) => {
    return profileUrl.includes(url)
  }
  const deleteProfileImgHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('why')
    setShowImage('')
    deleteMyProfileImgMutation().then(res => {
      if (res.status === 204) {
        console.log(
          '프로필 이미지 삭제 완료, 자동으로 기본 이미지로 지정 필수.'
        )
      } else if (res.status === 500) {
        console.log('프로필 이미지 삭제 실패.')
      }
    })
    setActive(1)
  }
  console.log(active)
  // useEffect(() => {
  //   if (showImage !== '') {
  //     setActive('custom')
  //   }
  // }, [showImage])
  console.log(isCustomImgUpload, 'isCustomImgUpload')

  return (
    <BottomModal
      initialHeight={window.innerHeight <= 700 ? 60 : 50} // height 비율이 짧아 진다면 58%로 맞추기.
      closeModal={handleCloseModal}>
      <ModalWrapper css={{ marginTop: '6px' }}>
        <ModalContainer css={{ padding: '0px 24px' }}>
          <DetailTitle>프로필 이미지를 선택해 주세요</DetailTitle>
          <Spacing size={32} />
          <ProfileContainer>
            <ShowImg
              onClick={() => showImage !== '' && setActive('custom')}
              isCustomImg={active === 'custom'}>
              <input
                onChange={event => addImageFile(event)}
                type="file"
                id="imageInput"
                accept="image/*"
                css={{ display: 'none' }}
              />
              {showImage !== '' &&
                (active === 'custom' || isCustomImgUpload) && (
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
              {active === 'custom' && (
                <div
                  onClick={deleteProfileImgHandler}
                  css={{ position: 'absolute', right: '0px', top: '0px' }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </ShowImg>
            <DefaultProfile isSelected={active === 1}>
              <Profile
                onClick={() => {
                  setActive(1)
                  setChanged(true)
                }}
                src="/images/defaultProfile.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 3}>
              <Profile
                onClick={() => {
                  setActive(3)
                  setChanged(true)
                }}
                src="/images/defaultProfile3.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 5}>
              <Profile
                onClick={() => {
                  setActive(5)
                  setChanged(true)
                }}
                src="/images/defaultProfile5.png"
                alt=""
              />
            </DefaultProfile>
          </ProfileContainer>
          <ProfileContainer css={{ marginTop: '16px' }}>
            <UploadImg htmlFor="imageInput">
              <CameraIconForUploadMypage />
            </UploadImg>
            <DefaultProfile isSelected={active === 2}>
              <Profile
                onClick={() => {
                  setActive(2)
                  setChanged(true)
                }}
                src="/images/defaultProfile2.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 4}>
              <Profile
                onClick={() => {
                  setActive(4)
                  setChanged(true)
                }}
                src="/images/defaultProfile4.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 6}>
              <Profile
                onClick={() => {
                  setActive(6)
                  setChanged(true)
                }}
                src="/images/defaultProfile6.png"
                alt=""
              />
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
