"use client";
import Badge from "@/components/designSystem/Badge";
import CheckingModal from "@/components/designSystem/modal/CheckingModal";
import ResultToast from "@/components/designSystem/toastMessage/resultToast";
import CameraIconForProfileEdit from "@/components/icons/CameraIconForProfileEdit";
import RightVector from "@/components/icons/RightVector";
import Spacing from "@/components/Spacing";
import useAuth from "@/hooks/user/useAuth";
import { authStore } from "@/store/client/authStore";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
import { isGuestUser } from "@/utils/user";
import useViewTransition from "@/hooks/useViewTransition";
import TextButton from "@/components/designSystem/text/TextButton";

export default function EditMyInfo() {
  const { addLogoutCheck } = authStore();
  const { logout } = useAuth();
  const {
    name,
    agegroup,
    email,
    preferredTags,
    isNameUpdated,
    isProfileImgUpdated,
    isTagUpdated,
    isPasswordUpdated,
    addIsNameUpdated,
    addIsPasswordUpdated,
    addIsProfileImgUpdated,
    addIsTagUpdated,
    profileUrl,
    userSocialTF,
  } = myPageStore();
  const navigateWithTransition = useViewTransition();
  const [isNameChangeToastShow, setIsNameChangeToastShow] = useState(false); // 변경시 보이게 해줄 토스트 메시지
  const [isProfileChangeToastShow, setIsProfileChangeToastShow] = useState(false); // 변경시 보이게 해줄 토스트 메시지
  const [isTagChangeToastShow, setIsTagChangeToastShow] = useState(false); // 변경시 보이게 해줄 토스트 메시지
  const [isPasswordChangeToastShow, setIsPasswordChangeToastShow] = useState(false); // 변경시 보이게 해줄 토스트 메시지
  // 로그 아웃 관련
  const [checkingLogoutModalClicked, setCheckingLogoutModalClicked] = useState(false);
  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (isNameUpdated) {
      setTimeout(() => {
        setIsNameChangeToastShow(true);
        addIsNameUpdated(false);
      }, 500);
    }
    if (isPasswordUpdated) {
      setTimeout(() => {
        setIsPasswordChangeToastShow(true);
        addIsPasswordUpdated(false);
      }, 500);
    }
    if (isProfileImgUpdated) {
      setTimeout(() => {
        setIsProfileChangeToastShow(true);
        addIsProfileImgUpdated(false);
      }, 500);
    }
    if (isTagUpdated) {
      setTimeout(() => {
        setIsTagChangeToastShow(true);
        addIsTagUpdated(false);
      }, 500);
    }
  }, [isNameUpdated, isPasswordUpdated, isProfileImgUpdated, isTagUpdated]);

  useEffect(() => {
    if (isLogoutClicked) {
      addLogoutCheck(true); // 로그아웃 예정 표시 => 자동 토큰 재발급 요청을 막기 위한 값.
      logout();
      setCheckingLogoutModalClicked(false);
    }
  }, [isLogoutClicked]);

  return (
    <Container>
      <ResultToast
        height={120}
        isShow={isNameChangeToastShow}
        setIsShow={setIsNameChangeToastShow}
        text="이름 변경이 완료되었어요"
      />
      <ResultToast
        height={120}
        isShow={isProfileChangeToastShow}
        setIsShow={setIsProfileChangeToastShow}
        text="프로필 이미지가 변경되었어요"
      />
      <ResultToast
        height={120}
        isShow={isPasswordChangeToastShow}
        setIsShow={setIsPasswordChangeToastShow}
        text="비밀번호가 변경되었어요"
      />
      <ResultToast
        height={120}
        isShow={isTagChangeToastShow}
        setIsShow={setIsTagChangeToastShow}
        text="태그가 변경되었어요"
      />
      <CheckingModal
        isModalOpen={checkingLogoutModalClicked}
        modalMsg="정말 로그아웃 하시겠어요?"
        modalTitle="로그아웃"
        modalButtonText="로그아웃"
        setIsSelected={setIsLogoutClicked}
        setModalOpen={setCheckingLogoutModalClicked}
      />
      <ProfileImg>
        <div onClick={() => setShowModal(true)} style={{ position: "relative" }}>
          <img
            src={profileUrl}
            style={{
              width: "80px",
              height: "100%",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              height: "32px",
              position: "absolute",
              right: "-4px",
              bottom: "-4px",
            }}
          >
            <CameraIconForProfileEdit />
          </div>
        </div>
      </ProfileImg>
      <div>
        <Spacing size={24} />
        <TextButton
          onClick={() => {
            document.documentElement.style.viewTransitionName = "forward";
            navigateWithTransition("/editMyName");
          }}
          isRightVector
          isLeftVector={false}
          text="이름"
          rightText={name}
          titleWeight="semibold"
        />

        <Line></Line>
        <Spacing size={8} />

        <TextButton isRightVector={false} isLeftVector={false} text="이메일" rightText={email} titleWeight="semibold" />

        <Line></Line>
        {!userSocialTF && (
          <>
            <Spacing size={8} />
            <TextButton
              onClick={() => {
                document.documentElement.style.viewTransitionName = "forward";
                navigateWithTransition("/editMyPassword");
              }}
              isRightVector={true}
              isLeftVector={false}
              text="비밀번호 변경"
              titleWeight="semibold"
            />

            <Line></Line>
          </>
        )}
        <Spacing size={8} />
        <TagBox
          onClick={() => {
            document.documentElement.style.viewTransitionName = "forward";
            navigateWithTransition("/editMyTag");
          }}
        >
          <TextButton isRightVector={true} isLeftVector={false} text="나의 태그" titleWeight="semibold" />
          <MyTag>
            <AgeBox style={{ display: "flex" }}>
              <LastTitle>연령대</LastTitle>
              <Tags>
                <Badge
                  isDueDate={false}
                  fontWeight="600"
                  color={palette.keycolor}
                  backgroundColor={palette.keycolorBG}
                  text={agegroup}
                />
              </Tags>
            </AgeBox>
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LastTitle>선호태그</LastTitle>
              <Tags>
                {preferredTags.map((text: string) => (
                  <Badge
                    key={text}
                    isDueDate={false}
                    fontWeight="500"
                    color={palette.비강조}
                    backgroundColor={palette.비강조4}
                    text={text}
                  />
                ))}
              </Tags>
            </div>
          </MyTag>
        </TagBox>
        <Spacing size={8} />
        <Line></Line>
        <Spacing size={8} />

        {!isGuestUser() && (
          <LogoutBox>
            <LogoutButton onClick={() => setCheckingLogoutModalClicked(true)}>로그아웃</LogoutButton>
            <VerticalLine>|</VerticalLine>
            <DrawalButton
              onClick={() => {
                document.documentElement.style.viewTransitionName = "forward";
                navigateWithTransition("/withdrawal");
              }}
            >
              탈퇴하기
            </DrawalButton>
          </LogoutBox>
        )}
        <Spacing size={150} />
        {showModal && <ProfileEditModal showModal={showModal} setShowModal={setShowModal} />}
      </div>
    </Container>
  );
}

const LogoutButton = styled.div`
  cursor: pointer;
`;
const DrawalButton = styled.div`
  cursor: pointer;
`;
const VerticalLine = styled.div`
  height: 16px;
  color: rgba(231, 231, 231, 1);
  margin: 0px 16px;
  padding: 2px 0px;
  display: flex;
  align-items: center;
`;
const LogoutBox = styled.div`
  height: 16px;
  font-size: 14px;

  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: ${palette.비강조2};
  margin-top: 32px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
`;
const AgeBox = styled.div`
  display: flex;
  align-items: center;
`;
const MyTag = styled.div`
  padding: 0px 8px 16px 8px;
  opacity: 0px;
`;
const TagBox = styled.div``;
const SmallTitle = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.25px;
  text-align: center;

  color: ${palette.기본};
`;
const LastTitle = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  width: 52px;
  line-height: 16.71px;
  letter-spacing: -0.025em;
  text-align: left;
  color: ${palette.비강조};
`;
const Value = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: ${palette.비강조};
  text-align: center;
`;
const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  padding: 0px 24px;
`;
const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  height: 80px;
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 52px;
  padding: 14px 8px;

  opacity: 0px;
  &:active {
    background-color: ${palette.buttonActive};
  }
`;
const Line = styled.div`
  height: 1px;
  border-bottom: 1px solid rgba(231, 231, 231, 1);
`;
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 8px;
`;
