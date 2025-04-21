"use client";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React from "react";

import useViewTransition from "@/hooks/useViewTransition";
import CloverIcon from "../icons/CloverIcon";
import RoundedImage from "../designSystem/profile/RoundedImage";
import Badge from "../designSystem/Badge";
import { formatNumberWithComma } from "@/utils/formatNumberWithComma";
import WarningIcon from "../icons/WarningIcon";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import useUserProfile from "@/hooks/userProfile/useUserProfile";
import ProfileRightVectorIcon from "../icons/ProfileRightVectorIcon";
import { authStore } from "@/store/client/authStore";

interface UserProfileDetailProps {
  isMyPage?: boolean;
}
export default function UserProfileDetail({ isMyPage = false }: UserProfileDetailProps) {
  const { setProfileShow, userProfileUserId } = userProfileOverlayStore();
  
  const navigateWithTransition = useViewTransition();

  if (!isMyPage && !userProfileInfo) return null;

  const profileData = isMyPage
    ? {
        ageGroup: myPageStore().agegroup,
        name: myPageStore().name,
        recentReportCount: 0,
        userRegDate: "",
        preferredTags: myPageStore().preferredTags,
        travelDistance: myPageStore().travelDistance,
        travelBadgeCount: myPageStore().travelBadgeCount,
        visitedCountryCount: myPageStore().visitedCountryCount,
        profileImageUrl: myPageStore().profileUrl,
      }
    : {
        ageGroup: userProfileInfo!.ageGroup,
        name: userProfileInfo!.name,
        recentReportCount: userProfileInfo!.recentReportCount,
        userRegDate: userProfileInfo!.userRegDate,
        preferredTags: userProfileInfo!.preferredTags,
        travelDistance: userProfileInfo!.travelDistance,
        travelBadgeCount: userProfileInfo!.travelBadgeCount,
        visitedCountryCount: userProfileInfo!.visitedCountryCount,
        profileImageUrl: userProfileInfo!.profileImageUrl,
      };

  const {
    ageGroup,
    name,
    recentReportCount,
    userRegDate,
    preferredTags,
    travelDistance,
    travelBadgeCount,
    visitedCountryCount,
    profileImageUrl,
  } = profileData;

  const TravelMenuList = [
    {
      Icon: CloverIcon,
      label: "방문한 국가",
      count: visitedCountryCount,
      nextLink: `/userProfile/${isMyPage ? authStore().userId : userProfileUserId}/log`,
    },
    {
      Icon: CloverIcon,
      label: "여행 배지",
      count: travelBadgeCount,
      nextLink: `/userProfileBadge/${isMyPage ? authStore().userId : userProfileUserId}`,
    },
  ];

  const cutTags = preferredTags.length > 2 ? preferredTags.slice(0, 2) : preferredTags;

  const moveToNextLink = (link: string) => {
    navigateWithTransition(link);
    setTimeout(() => {
      setProfileShow(false);
    }, 50);
  };
  const IS_REPORTED = recentReportCount > 0;
  const editMyProfileInfo = () => {
    document.documentElement.style.viewTransitionName = "forward";
    navigateWithTransition("/editMyInfo");
  };

  return (
    <Container>
      <UserInfoContainer>
        <ProfileImgContainer>
          <RoundedImage src={profileImageUrl} size={80} />
        </ProfileImgContainer>
        <UserTextInfoContainer>
          <UserNameBox>
            <Name onClick={isMyPage && editMyProfileInfo}>
              {name}
              {isMyPage && <ProfileRightVectorIcon height={16} />}
            </Name>
            <UserInfo>{isMyPage ? myPageStore().email : userRegDate + "가입"}</UserInfo>
          </UserNameBox>
          <UserTags>
            <Badge
              isDueDate={false}
              fontWeight="600"
              color={palette.keycolor}
              backgroundColor={palette.keycolorBG}
              text={ageGroup}
            />
            {cutTags.map((text: string) => (
              <Badge
                key={text}
                isDueDate={false}
                fontWeight="500"
                color={palette.비강조}
                backgroundColor={palette.검색창}
                text={text}
              />
            ))}
            {preferredTags.length > cutTags.length ? (
              <Badge
                isDueDate={false}
                fontWeight="500"
                color={palette.비강조}
                backgroundColor={palette.검색창}
                text={`+${preferredTags.length - cutTags.length}`}
              />
            ) : null}
          </UserTags>
        </UserTextInfoContainer>

        {IS_REPORTED && !isMyPage && (
          <ReportedUser>
            <WarningIcon />
            최근 신고가 {recentReportCount}회 누적된 회원이에요
          </ReportedUser>
        )}
      </UserInfoContainer>
      <TravelDistanceContainer>
        <Title>총 여행한 거리✨</Title>
        <TravelDistance>{formatNumberWithComma(travelDistance)}km</TravelDistance>
      </TravelDistanceContainer>

      <TravelMenuContainer>
        {TravelMenuList.map(({ Icon, label, count, nextLink }) => (
          <TravelMenu key={label} onClick={() => moveToNextLink(nextLink)}>
            <TitleBox>
              <IconWrapper>
                <Icon />
              </IconWrapper>
              <Subtitle>{label}</Subtitle>
            </TitleBox>
            <NavigateBox>
              <CountryCount>{count}</CountryCount>
              <VectorBox>
                <ProfileRightVectorIcon />
              </VectorBox>
            </NavigateBox>
          </TravelMenu>
        ))}
      </TravelMenuContainer>
    </Container>
  );
}
const ReportedUser = styled.div`
  margin-top: 12px;
  display: flex;
  height: 26px;
  gap: 4px;
  border-radius: 20px;
  padding-top: 4px;
  padding-right: 12px;
  padding-bottom: 4px;
  padding-left: 8px;
  background-color: ${palette.기본};
  color: white;
  font-weight: 400;
  font-size: 12px;
  align-items: center;
`;
const Container = styled.div`
  margin-top: 4px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImgContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 12px;
`;

const UserTextInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const UserNameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 16px;
  letter-spacing: -0.25px;
  text-align: center;
  color: ${palette.기본};
`;

export const UserInfo = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.25px;
  text-align: center;
  color: ${palette.비강조2};
`;

export const UserTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

export const TravelDistanceContainer = styled.div`
  margin-top: 16px;
  padding: 24px;
  background-color: ${palette.검색창};

  height: 88px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 20px;
`;

export const Title = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

export const TravelDistance = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 16px;
  letter-spacing: 0px;
`;

export const TravelMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 16px 0px;
`;
export const TravelMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 0px;
  height: 52px;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconWrapper = styled.div`
  width: 34;
  height: 34;
  border-radius: 12px;
  background-color: ${palette.검색창};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const Subtitle = styled.div`
  color: ${palette.기본};
`;

export const NavigateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const VectorBox = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CountryCount = styled.div`
  color: ${palette.비강조};
`;
