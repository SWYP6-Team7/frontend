"use client";
import Badge from "@/components/designSystem/Badge";
import CheckingModal from "@/components/designSystem/modal/CheckingModal";
import RoundedImage from "@/components/designSystem/profile/RoundedImage";
import TextButton from "@/components/designSystem/text/TextButton";
import RightVector from "@/components/icons/RightVector";
import Spacing from "@/components/Spacing";
import useViewTransition from "@/hooks/useViewTransition";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import { isGuestUser } from "@/utils/user";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MyPage() {
  const navigateWithTransition = useViewTransition();
  const { name, agegroup, email, preferredTags, profileUrl } = myPageStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const cutTags = preferredTags.length > 2 ? preferredTags.slice(0, 2) : preferredTags;
  const onLinkAnnouncement = () => {
    document.documentElement.style.viewTransitionName = "forward";
    navigateWithTransition("/announcement");
  };
  return (
    <Container>
      <UserInfo>
        <ProfileImg>
          <RoundedImage src={isGuestUser() ? "/images/defaultProfile.png" : profileUrl} size={80} />
        </ProfileImg>
        <div style={{ width: "100%" }}>
          {!isGuestUser() ? (
            <>
              <MoreBox
                onClick={() => {
                  document.documentElement.style.viewTransitionName = "forward";
                  navigateWithTransition("/editMyInfo");
                }}
              >
                <UserName>{name}</UserName>
                <div style={{ display: "flex", padding: "8px 5px" }}>
                  <RightVector />
                </div>
              </MoreBox>
              <Email>{email}</Email>
              <Tags>
                <div style={{ marginRight: "8px" }}>
                  <Badge
                    isDueDate={false}
                    fontWeight="600"
                    color={palette.keycolor}
                    backgroundColor={palette.keycolorBG}
                    text={agegroup}
                  />
                </div>

                {cutTags.map((text: string) => (
                  <div style={{ marginRight: "8px" }}>
                    <Badge
                      key={text}
                      isDueDate={false}
                      fontWeight="500"
                      color={palette.비강조}
                      backgroundColor="white"
                      text={text}
                    />
                  </div>
                ))}
                {preferredTags.length > cutTags.length ? (
                  <Badge
                    isDueDate={false}
                    fontWeight="500"
                    color={palette.비강조}
                    backgroundColor="white"
                    text={`+${preferredTags.length - cutTags.length}`}
                  />
                ) : null}
              </Tags>
            </>
          ) : (
            <>
              <MoreBox onClick={() => setShowLoginModal(true)}>
                <UserName>로그인 & 회원가입</UserName>
                <div style={{ display: "flex", padding: "8px 5px" }}>
                  <RightVector />
                </div>
              </MoreBox>
              <LoginInfo>
                로그인 후 모잉에서
                <br /> 설레는 여행을 떠나보세요.
              </LoginInfo>
            </>
          )}
        </div>
      </UserInfo>

      <Menu>
        <Box>
          <Title>모잉 소식</Title>
          <Spacing size={8} />
          <TextButton
            isLeftVector
            isRightVector={false}
            onClick={onLinkAnnouncement}
            text="공지사항"
            leftIconSrc="/images/createTripBtn.png"
          />
          <Spacing size={8} />
        </Box>

        <Box>
          <Title>내 여행 현황</Title>

          <TextButton
            onClick={() => {
              document.documentElement.style.viewTransitionName = "forward";
              navigateWithTransition("/requestedTrip");
            }}
            isLeftVector
            isRightVector={false}
            text="참가 신청한 여행"
            leftIconSrc="/images/createTripBtn.png"
          />
          <Spacing size={8} />

          <TextButton
            onClick={() => {
              document.documentElement.style.viewTransitionName = "forward";
              navigateWithTransition("/myCommunity");
            }}
            isLeftVector
            isRightVector={false}
            text="작성한 글"
            leftIconSrc="/images/createTripBtn.png"
          />
          <Spacing size={8} />
        </Box>
        <div style={{ marginTop: "16px" }}>
          <TextButton
            onClick={(e: MouseEvent) => {
              router.push("/contact");
            }}
            text="1:1 문의하기"
            isLeftVector={false}
            isRightVector={false}
          />
          <a href="/pdf/service_terms(241115).pdf" target="_blank">
            <TextButton text="서비스이용약관" isLeftVector={false} isRightVector={false} />
          </a>
          <a href="/pdf/privacy_policy(241006).pdf" target="_blank">
            <TextButton text="개인정보처리방침" isLeftVector={false} isRightVector={false} />
          </a>

          <Spacing size={150} />
        </div>
      </Menu>

      <CheckingModal
        isModalOpen={showLoginModal}
        onClick={() => router.push("/login")}
        modalMsg={`로그인 후 이용할 수 있어요.\n로그인 하시겠어요?`}
        modalTitle="로그인 안내"
        modalButtonText="로그인"
        setModalOpen={setShowLoginModal}
      />
    </Container>
  );
}
const ProfileImg = styled.div``;
const Container = styled.div`
  padding: 0px 24px;
  margin-top: 8px;
`;
const MoreBox = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`;
const UserName = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  color: ${palette.기본};
  margin-right: 4px;
`;

const Tags = styled.div`
  display: flex;
`;
const LoginInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  letter-spacing: -0.25px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  color: ${palette.비강조};
`;

const Email = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: ${palette.비강조};
  margin-bottom: 9px;
`;
const UserInfo = styled.div`
  height: 128px;
  width: 100%;
  background-color: ${palette.검색창};
  padding: 24px 16px;
  gap: 16px;
  border-radius: 20px;
  display: flex;
`;
const Menu = styled.div`
  margin-top: 24px;
  width: 100%;
`;
const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  color: ${palette.기본};
  text-align: left;
  margin-bottom: 8px;
`;
const SmallTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  cursor: pointer;
  text-align: center;
  color: ${palette.기본};
  height: 52px;
  padding: 14px 0px 22px 0px;
  gap: 8px;
  opacity: 0px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;
const Box = styled.div`
  border-bottom: 1px solid #e7e7e7;
  padding-top: 14px;
`;
