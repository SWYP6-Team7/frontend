"use client";
import { myPageStore } from "@/store/client/myPageStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import useViewTransition from "@/hooks/useViewTransition";
import CloverIcon from "../icons/CloverIcon";
import RoundedImage from "../designSystem/profile/RoundedImage";
import Badge from "../designSystem/Badge";
import { formatNumberWithComma } from "@/utils/formatNumberWithComma";
import WarningIcon from "../icons/WarningIcon";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import useUserProfile from "@/hooks/userProfile/useUserProfile";
import ProfileRightVectorIcon from "../icons/ProfileRightVectorIcon";

interface UserProfileDetailProps {
  isMyPage?: boolean;
}
export default function UserProfileDetail({ isMyPage = false }: UserProfileDetailProps) {
  const { setProfileShow, userProfileUserId } = userProfileOverlayStore();
  const { userProfileInfo, isLoadingUserProfileInfo } = useUserProfile();
  const navigateWithTransition = useViewTransition();

  if (!userProfileInfo) return null;
  const {
    ageGroup,
    name,
    recentReportCount,
    userRegDate,
    preferredTags,
    travelDistance,
    travelBadgeCount,
    visitedCountryCount,
  } = userProfileInfo;
  const {
    name: myName,
    agegroup: myAgeGroup,
    email: myEmail,
    preferredTags: myPreferredTags,
    travelDistance: myTravelDistance,
    travelBadgeCount: myTravelBageCount,
    visitedCountryCount: myVisitedCountryCount,
  } = myPageStore();

  const TravelMenuList = [
    {
      Icon: CloverIcon,
      label: "방문한 국가",
      count: isMyPage ? myVisitedCountryCount : visitedCountryCount,
      nextLink: `/userProfile/${userProfileUserId}/log`,
    },
    {
      Icon: CloverIcon,
      label: "여행 배지",
      count: isMyPage ? myTravelBageCount : travelBadgeCount,
      nextLink: `/userProfileBadge/${userProfileUserId}`,
    },
  ];

  const preferredTagsTarget = isMyPage ? myPreferredTags : preferredTags;

  const cutTags = preferredTagsTarget.length > 2 ? preferredTagsTarget.slice(0, 2) : preferredTagsTarget;

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
          <RoundedImage src="/images/defaultProfile.png" size={80} />
        </ProfileImgContainer>
        <UserTextInfoContainer>
          <UserNameBox>
            <Name onClick={isMyPage && editMyProfileInfo}>
              {isMyPage ? myName : name}
              {isMyPage && <ProfileRightVectorIcon height={16} />}
            </Name>
            <UserInfo>{isMyPage ? myEmail : userRegDate + "가입"}</UserInfo>
          </UserNameBox>
          <UserTags>
            <Badge
              isDueDate={false}
              fontWeight="600"
              color={palette.keycolor}
              backgroundColor={palette.keycolorBG}
              text={isMyPage ? myAgeGroup : ageGroup}
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
            {preferredTagsTarget.length > cutTags.length ? (
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
        <TravelDistance>{formatNumberWithComma(isMyPage ? myTravelDistance : travelDistance)}km</TravelDistance>
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

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
