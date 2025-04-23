"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import useViewTransition from "@/hooks/useViewTransition";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import HorizonBoxLayout from "../HorizonBoxLayout";
import { daysAgo } from "@/utils/time";
import { useInView } from "react-intersection-observer";
import useUserProfile from "@/hooks/userProfile/useUserProfile";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { IUserRelatedTravelList } from "@/model/userProfile";
import RoundedImage from "../designSystem/profile/RoundedImage";

export default function UserTravelTabMenu() {
  const { setProfileShow } = userProfileOverlayStore();
  const navigateWithTransition = useViewTransition();
  const [isClickedCloseBtn, setIsClickedCloseBtn] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // 스크롤 감지 ref 선언
  const [createdTravelsRef, createdTravelsInView] = useInView();
  const [appliedTravelsRef, appliedTravelsInView] = useInView();

  const {
    userProfileCreatedTravelsData,
    isUserProfileCreatedTravelsLoading,
    fetchNextUserProfileCreatedTravelsPage,
    isUserProfileCreatedTravelsFetching,
    hasNextUserProfileCreatedTravelsPage,

    userProfileAppliedTravelsData,
    isUserProfileAppliedTravelsLoading,
    fetchNextUserProfileAppliedTravelsPage,
    isUserProfileAppliedTravelsFetching,
    hasNextUserProfileAppliedTravelsPage,

    userProfileInfo,
  } = useUserProfile();

  useEffect(() => {
    if (isClickedCloseBtn) {
      setTimeout(() => {
        setProfileShow(false);
        setIsClickedCloseBtn(false);
      }, 300);
    }
  }, [isClickedCloseBtn]);

  useInfiniteScroll(() => {
    if (createdTravelsInView) {
      !isUserProfileCreatedTravelsFetching &&
        hasNextUserProfileCreatedTravelsPage &&
        fetchNextUserProfileCreatedTravelsPage();
    }
  }, [
    createdTravelsInView,
    isUserProfileCreatedTravelsFetching,
    fetchNextUserProfileCreatedTravelsPage,
    hasNextUserProfileCreatedTravelsPage,
  ]);

  useInfiniteScroll(() => {
    if (appliedTravelsInView) {
      !isUserProfileAppliedTravelsFetching &&
        hasNextUserProfileAppliedTravelsPage &&
        fetchNextUserProfileAppliedTravelsPage();
    }
  }, [
    appliedTravelsInView,
    isUserProfileAppliedTravelsFetching,
    fetchNextUserProfileAppliedTravelsPage,
    hasNextUserProfileAppliedTravelsPage,
  ]);

  if (isUserProfileCreatedTravelsLoading || isUserProfileAppliedTravelsLoading) {
    return null;
  }
  const userProfileCreatedTravels =
    (userProfileCreatedTravelsData?.pages[0].content as IUserRelatedTravelList["content"]) ?? [];

  const userProfileAppliedTravels =
    (userProfileAppliedTravelsData?.pages[0].content as IUserRelatedTravelList["content"]) ?? [];

  const isCreatedTravelsNoData = userProfileCreatedTravels.length === 0;
  const isAppliedTravelsNoData = userProfileAppliedTravels.length === 0;

  const clickTrip = (travelNumber: number) => {
    navigateWithTransition(`/trip/detail/${travelNumber}`);
    setTimeout(() => {
      setProfileShow(false);
    }, 50);
  };

  return (
    <Container>
      <TabMenuContainer>
        <TabMenu isSelected={selectedTab === 0} onClick={() => setSelectedTab(0)}>
          <HostTravel>만든 여행</HostTravel>
          <Count isSelected={selectedTab === 0}>{userProfileInfo?.createdTravelCount}</Count>
        </TabMenu>
        <TabMenu isSelected={selectedTab === 1} onClick={() => setSelectedTab(1)}>
          <ParticipantTravel>참가한 여행</ParticipantTravel>
          <Count isSelected={selectedTab === 1}>{userProfileInfo?.participatedTravelCount}</Count>
        </TabMenu>
      </TabMenuContainer>
      {/* 조건부 */}
      {/* 0 이 되면 왼쪽으로 이동 1이 되면 오른쪽으로 이동. */}
      <TravelListBox>
        <InnerSlider selectedTab={selectedTab}>
          <HostTravelList>
            {isCreatedTravelsNoData && (
              <Empty>
                <RoundedImage size={80} src="/images/noData.png" />
                <NoData>
                  <div>아직 만든 여행이 없어요</div>
                </NoData>
              </Empty>
            )}
            {!isUserProfileCreatedTravelsLoading &&
              userProfileCreatedTravelsData &&
              userProfileCreatedTravelsData.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.content?.map(
                    ({ travelNumber, location, userName, title, tags, maxPerson, createdAt, nowPerson }) => (
                      <Item key={title} onClick={() => clickTrip(travelNumber)}>
                        <HorizonBoxLayout
                          bookmarkNeed={false}
                          bookmarked={false}
                          travelNumber={travelNumber}
                          userName={userName}
                          title={title}
                          tags={tags}
                          total={maxPerson}
                          location={location}
                          daysAgo={daysAgo(createdAt)}
                          recruits={nowPerson}
                          userProfileType={true}
                        />
                      </Item>
                    )
                  )}
                </React.Fragment>
              ))}
            <div ref={createdTravelsRef} style={{ height: 1 }} />
          </HostTravelList>

          <ParticipantTravelList>
            {isAppliedTravelsNoData && (
              <Empty>
                <RoundedImage size={80} src="/images/noData.png" />
                <NoData>
                  <div>아직 참가한 여행이 없어요</div>
                </NoData>
              </Empty>
            )}
            {!isUserProfileAppliedTravelsLoading &&
              userProfileAppliedTravelsData &&
              userProfileAppliedTravelsData.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.content?.map(
                    ({ travelNumber, location, userName, title, tags, maxPerson, createdAt, nowPerson }) => (
                      <Item key={title} onClick={() => clickTrip(travelNumber)}>
                        <HorizonBoxLayout
                          bookmarkNeed={false}
                          bookmarked={false}
                          travelNumber={travelNumber}
                          userName={userName}
                          title={title}
                          tags={tags}
                          total={maxPerson}
                          location={location}
                          daysAgo={daysAgo(createdAt)}
                          recruits={nowPerson}
                          userProfileType={true}
                        />
                      </Item>
                    )
                  )}
                </React.Fragment>
              ))}
            <div ref={appliedTravelsRef} style={{ height: 1 }} />
          </ParticipantTravelList>
        </InnerSlider>
      </TravelListBox>
    </Container>
  );
}
const NoData = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: center;
  color: ${palette.기본};
`;
const Empty = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const TabMenuContainer = styled.div`
  position: sticky;
  top: 100px;
  z-index: 1002;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  margin: 0px -24px;
`;

interface TabMenuProps {
  isSelected: boolean;
}

const TabMenu = styled.button<TabMenuProps>`
  flex: 1;
  padding: 16px 0;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: ${({ isSelected }) => (isSelected ? `2px solid ${palette.기본}` : `1px solid ${palette.비강조3}`)};
  color: ${({ isSelected }) => (isSelected ? palette.기본 : palette.비강조2)};
  font-weight: 600;
  display: flex;
  justify-content: center;
  gap: 4px;
  transition: all 0.4s ease;

  font-size: 14px;
`;

const HostTravel = styled.div`
  font-size: 14px;
`;
const ParticipantTravel = styled.div``;

const Count = styled.div<TabMenuProps>`
  color: ${({ isSelected }) => (isSelected ? palette.keycolor : palette.비강조2)};
`;

interface TravelListBoxProps {
  selectedTab: number;
}

export const TravelListBox = styled.div<TravelListBoxProps>`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

export const InnerSlider = styled.div<TravelListBoxProps>`
  display: flex;
  width: 200%; // 두 개 탭이니까 두 배
  transition: transform 0.3s ease-in-out;
  transform: ${({ selectedTab }) => (selectedTab === 0 ? "translateX(0%)" : "translateX(-100%)")};
`;
export const HostTravelList = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

export const ParticipantTravelList = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

export const Item = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${palette.비강조4};
`;
