"use client";
import BottomModal from "@/components/BottomModal";
import Button from "@/components/designSystem/Buttons/Button";
import ButtonContainer from "@/components/ButtonContainer";
import CameraIconForUploadMypage from "@/components/icons/CameraIconForUploadMypage";
import PictureIcon from "@/components/icons/PictureIcon";
import ProfileRemoveIcon from "@/components/icons/ProfileRemoveIcon";
import Spacing from "@/components/Spacing";
import useMyPage from "@/hooks/myPage/useMyPage";
import { authStore } from "@/store/client/authStore";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import { isDefaultProfile } from "@/utils/profileUrl";
import styled from "@emotion/styled";
import React, { act, ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  showModal: boolean;

  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FileData {
  lastModified: number;
  name: string;
  size: number;
  type: string;
}

export default function ProfileEditModal({ showModal, setShowModal }: ModalProps) {
  const {
    updateDefaultProfileImgMutation,
    isUpdateDefaultProfileImgSuccess,
    deleteTempProfileImgMutation,
    deleteMyProfileImgMutation,
    isDeleteSuccessProfileImg,
    tempProfileImageMutation,
    updateRealProfileImgMutation,

    firstProfileImageMutation, // 삭제 후 등록 .
    isFirstProfileImagePostSuccess,
  } = useMyPage();
  const router = useRouter();
  const { profileUrl, addIsProfileImgUpdated, addProfileUrl } = myPageStore();

  const { accessToken } = authStore();

  const [clickedSave, setClickedSave] = useState(false);

  // 일단 업로드를 하면, 저장할 용도 (추후에 미리보기 api 추가 되면 수정 예정.)
  const [fileImg, setFileImg] = useState<FormData>(new FormData());

  const [showImage, setShowImage] = useState(profileUrl);
  const [showImageCamera, setShowImageCamera] = useState("");

  const ret = isDefaultProfile(profileUrl);
  const [active, setActive] = useState(
    ret.length === 0 ? "custom" : ret[0][ret[0].length - 5] === "e" ? 1 : +ret[0][ret[0].length - 5]
  );

  const isCustomImg = isDefaultProfile(showImage).length === 0; // 커스텀 이미지 라면 true

  const isCameraCustomImg = isDefaultProfile(showImageCamera).length === 0; // 커스텀 이미지 라면 true
  // 갤러리 이미지를 띄어야하는 경우. 여부를 표시.
  const [isCustomImgUpload, setIsCustomImgUpload] = useState(ret.length === 0 ? true : false);

  const [changed, setChanged] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(profileUrl, active);
  const profileSaveHandler = () => {
    // 프로필 저장. 실제 update api 요청.
    if (active !== "custom" && active !== "camera") {
      handleDefaultProfileUpload(active as number);
      addIsProfileImgUpdated(true);
    } else {
      // 갤러리 이미지로 선택.
      if (active === "custom") {
        updateRealProfileImgMutation(showImage)
          .then((res) => {
            console.log("프로필 업데이트 후, res", res);
            setShowImage(res.url);

            setChanged(true);
            addIsProfileImgUpdated(true);
          })
          .catch((e) => {
            console.log(e, "커스텀 프로필 정식 등록 요청 에러");
          });
      } // 카메라 이미지로 선택
      else {
        updateRealProfileImgMutation(showImageCamera)
          .then((res) => {
            console.log("카메라프로필 업데이트 후, res", res);
            setShowImage(res.url);
            setChanged(true);
            addIsProfileImgUpdated(true);
          })
          .catch((e) => {
            console.log(e, "카메라 프로필 정식 등록 요청 에러");
          });
      }
      router.refresh();
    }

    setShowModal(false);
    setClickedSave(true);
  };
  console.log(profileUrl, "이미지 url");
  // 임시 등록 요청(카메라)
  const addImageFileCamera = (event: ChangeEvent<HTMLInputElement>) => {
    setActive("camera");
    if (event.target.files !== null) {
      // post 요청 보내기.
      const formData = new FormData(); // 폼데이터 생성
      formData.append("file", event.target.files[0]);
      // post 요청 후 받은 url로 보여주기

      //이 아래 부분은 미리보기 추가 되면 지울고 미리보기 api로 교체 예정.
      tempProfileImageMutation(formData)
        .then((res) => {
          console.log("카메라 프로필 임시 등록 요청 후, res", res);
          setShowImageCamera(res.tempUrl);

          setChanged(true);
          setActive("camera");
          setIsCustomImgUpload(true);
        })
        .catch((e) => {
          console.log(e, " 카메라 프로필 임시 등록 요청 에러");
        });

      console.log(event.target.files[0]);
    }
  };
  console.log(showImageCamera, "이미지 카메라");
  // 임시 등록 요청. (갤러리)
  const addImageFileGalary = (event: ChangeEvent<HTMLInputElement>) => {
    setActive("custom");
    if (event.target.files !== null) {
      // post 요청 보내기.
      const formData = new FormData(); // 폼데이터 생성
      formData.append("file", event.target.files[0]);
      // post 요청 후 받은 url로 보여주기

      tempProfileImageMutation(formData)
        .then((res) => {
          console.log("갤러리 프로필 임시 등록 요청 후, res", res);
          setShowImage(res.tempUrl);

          setChanged(true);
          setActive("custom");
          setIsCustomImgUpload(true);
        })
        .catch((e) => {
          console.log(e, "갤러리 프로필 임시 등록 요청 에러");
        });

      console.log(event.target.files[0]);
    }
  };

  const handleDefaultProfileUpload = async (defaultNumber: number) => {
    try {
      // axios로 서버에 전송
      updateDefaultProfileImgMutation(defaultNumber);
      addIsProfileImgUpdated(true);
    } catch (error) {
      console.log("기본 프로필 업로드 오류");
    }
  };

  // 임시 등록된 카메라 프로필 삭제
  const deleteProfileCameraImgHandler = async (event: React.MouseEvent) => {
    event.stopPropagation();

    deleteTempProfileImgMutation(showImageCamera)
      .then(() => {
        setActive(1);
        setChanged(true);
        setShowImageCamera("");
        console.log("카메라 임시 등록한 이미지 삭제 완료.");
      })
      .catch((e) => {
        console.log("카메라 임시 등록 이미지 삭제 실패");
      });
  };
  // 프로필 삭제.
  const deleteProfileImgHandler = async (event: React.MouseEvent) => {
    event.stopPropagation();

    setShowImage("");
    if (showImage === profileUrl) {
      // 현재 보여지는 이미지가 지금의 프로필 사진과 같은 거라면 프로필 삭제.
      deleteMyProfileImgMutation()
        .then(() => {
          firstProfileImageMutation(accessToken!).then(() => {
            setActive(1);
            setChanged(true);
            // addProfileUrl('')
            console.log("실제 프로필 삭제& 삭제 후 기본 이미지 등록 완료.");
          });
        })
        .catch(() => {
          console.log("실제 프로필 삭제 실패 & 기본 이미지 등록 ");
        });
    } else {
      // 아니라면. 임시 저장된 것 삭제.
      deleteTempProfileImgMutation(showImage)
        .then(() => {
          setActive(1);
          setChanged(true);
          console.log("갤러리 임시 등록한 이미지 삭제 완료.");
        })
        .catch(() => {
          console.log("갤러리 임시 등록 이미지 삭제 실패");
        });
    }
  };
  console.log(active);
  useEffect(() => {
    return () => {
      if (clickedSave === false && (showImage !== "" || showImageCamera !== "")) {
        const deleteTempImage = async () => {
          if (showImage !== "" && isCustomImg && showImage !== profileUrl) {
            try {
              await deleteTempProfileImgMutation(showImage);
              console.log("갤러리 임시 등록한 이미지 삭제 완료.");
            } catch (e) {
              console.log("갤러리 임시 등록 이미지 삭제 실패");
            }
          } else if (showImageCamera !== "" && isCameraCustomImg && showImage !== profileUrl) {
            try {
              await deleteTempProfileImgMutation(showImageCamera);
              console.log("카메라 임시 등록한 이미지 삭제 완료.");
            } catch (e) {
              console.log("카메라 임시 등록 이미지 삭제 실패");
            }
          }
        };

        deleteTempImage();
      }
    };
  }, []); //컴포넌트 언마운트 시에만 실행

  console.log("check", showImage, showImageCamera);

  console.log(isCustomImgUpload, "isCustomImgUpload");
  // 갤러리 부분에 사진을 보여줘야하는 경우.
  const isShowingGallery = showImage !== "" && isCustomImg && (active === "custom" || isCustomImgUpload); // 이미지가 존재하고, 커스텀이며, 클릭되어있거나 or 클릭안해도 업로드는 해둔상태.
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <BottomModal
      initialHeight={window?.innerHeight <= 700 ? 60 : 50} // height 비율이 짧아 진다면 58%로 맞추기.
      closeModal={handleCloseModal}
    >
      <ModalWrapper style={{ marginTop: "6px" }}>
        <ModalContainer style={{ padding: "0px 24px" }}>
          <DetailTitle>프로필 이미지를 선택해 주세요</DetailTitle>
          <Spacing size={32} />
          <ProfileContainer>
            <ShowImg
              onClick={
                (e: any) => {
                  e.stopPropagation();
                  if (showImage !== "" && isCustomImg) setActive("custom");
                }
                // 이미지가 존재하고, 현재 보여진 이미지가 커스텀일 때만 active 보더 표시.
              }
              isCustomImg={active === "custom"}
            >
              {(showImage === "" || !isCustomImg) && (
                <>
                  <UploadImg onClick={(e: any) => e.stopPropagation()} htmlFor="imageInput"></UploadImg>
                  <input
                    onChange={(event) => addImageFileGalary(event)}
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </>
              )}
              {/* 직접 올린 이미지만 show 함. */}
              {isShowingGallery && (
                <img
                  src={showImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    position: "absolute",
                  }}
                />
              )}
              <div style={{ position: "absolute", pointerEvents: "none" }}>
                {isShowingGallery === false && <PictureIcon />}
              </div>

              {active === "custom" && (
                <div onClick={deleteProfileImgHandler} style={{ position: "absolute", right: "0px", top: "0px" }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </ShowImg>
            <DefaultProfile isSelected={active === 1}>
              <Profile
                onClick={() => {
                  setActive(1);
                  setChanged(true);
                }}
                src="/images/defaultProfile.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 3}>
              <Profile
                onClick={() => {
                  setActive(3);
                  setChanged(true);
                }}
                src="/images/defaultProfile3.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 5}>
              <Profile
                onClick={() => {
                  setActive(5);
                  setChanged(true);
                }}
                src="/images/defaultProfile5.png"
                alt=""
              />
            </DefaultProfile>
          </ProfileContainer>
          <ProfileContainer style={{ marginTop: "16px" }}>
            <ShowImg
              onClick={(e: any) => {
                e.stopPropagation();
                // 이미지가 존재하고, 현재 보여진 이미지가 커스텀일 때만 active 보더 표시.
                if (showImageCamera !== "" && isCustomImg) setActive("camera");
              }}
              isCustomImg={active === "camera"}
            >
              {(showImageCamera === "" || !isCustomImg) && (
                <>
                  <UploadImg onClick={(e: any) => e.stopPropagation()} htmlFor="cameraInput"></UploadImg>
                  <input
                    onChange={(event) => addImageFileCamera(event)}
                    type="file"
                    id="cameraInput"
                    capture="environment"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </>
              )}
              {/* 커스텀 이미지만 show 함. */}

              {showImageCamera !== "" && (
                <img
                  src={showImageCamera}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    position: "absolute",
                  }}
                />
              )}
              <div style={{ position: "absolute", pointerEvents: "none" }}>
                {showImageCamera === "" && <CameraIconForUploadMypage />}
              </div>

              {active === "camera" && (
                <div onClick={deleteProfileCameraImgHandler} style={{ position: "absolute", right: "0px", top: "0px" }}>
                  <ProfileRemoveIcon />
                </div>
              )}
            </ShowImg>
            <DefaultProfile isSelected={active === 2}>
              <Profile
                onClick={() => {
                  setActive(2);
                  setChanged(true);
                }}
                src="/images/defaultProfile2.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 4}>
              <Profile
                onClick={() => {
                  setActive(4);
                  setChanged(true);
                }}
                src="/images/defaultProfile4.png"
                alt=""
              />
            </DefaultProfile>
            <DefaultProfile isSelected={active === 6}>
              <Profile
                onClick={() => {
                  setActive(6);
                  setChanged(true);
                }}
                src="/images/defaultProfile6.png"
                alt=""
              />
            </DefaultProfile>
          </ProfileContainer>
          <div style={{ marginTop: "16px" }}></div>
        </ModalContainer>
      </ModalWrapper>
      <ButtonContainer>
        <Button
          disabled={!changed}
          text="저장"
          onClick={profileSaveHandler}
          addStyle={{
            backgroundColor: "rgba(62, 141, 0, 1)",
            color: "rgba(240, 240, 240, 1)",
            boxShadow: "rgba(170, 170, 170, 0.1)",
          }}
        />
      </ButtonContainer>
    </BottomModal>
  );
}
// 프로필 사진 부분
const ProfileContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;
const DefaultProfile = styled.div<{ isSelected: boolean }>`
  position: relative;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  border: ${(props) => (props.isSelected ? `2px solid ${palette.keycolor}` : "none")};
`;
const Profile = styled.img`
  display: block;
  object-fit: cover;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;
const ShowImg = styled.div<{ isCustomImg: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-height: 72px;
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: ${palette.비강조4};
  border-radius: 50%;
  border: ${(props) => (props.isCustomImg ? `2px solid ${palette.keycolor}` : "none")};
`;
const UploadImg = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-height: 72px;
  aspect-ratio: 1 / 1;
  width: 100%;
  height: 100%;
  background-color: ${palette.비강조4};
  border-radius: 50%;
`;
const ModalWrapper = styled.div``;
const ModalContainer = styled.div``;
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
`;
