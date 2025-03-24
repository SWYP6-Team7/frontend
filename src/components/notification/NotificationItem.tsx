"use client";
import { INotificationContent } from "@/model/notification";
import styled from "@emotion/styled";
import React from "react";
import { palette } from "@/styles/palette";
import { daysAgo, daysLeft, formatTime } from "@/utils/time";
import Badge from "../designSystem/Badge";
import CommunityNotification from "../icons/CommunityNotification";
import TripNotificationIcon from "../icons/TripNotificationIcon";
import { useRouter } from "next/navigation";
import { useBackPathStore } from "@/store/client/backPathStore";

interface NotificationItemProps {
  data: INotificationContent;
}

const NotificationItem = ({ data }: NotificationItemProps) => {
  const router = useRouter();
  const { setTravelDetail } = useBackPathStore();
  const onclickLink = () => {
    if (data.title === "멤버 댓글 알림") {
      router.push(`/trip/comment/${data.travelNumber}`);
    } else if (data.title === "커뮤니티") {
      router.push(`/community/detail/${data.communityNumber}`);
    } else if (data?.title === "신고 접수 경고") {
      return;
    } else {
      router.push(`/trip/detail/${data.travelNumber}`);
      setTravelDetail("/notification");
    }
  };
  return (
    <Container onClick={onclickLink}>
      <TopContainer>
        {data?.title === "신고 접수 경고" ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill="#3E8D00" />
            <path
              d="M11.668 6.33333C11.668 6.14924 11.8172 6 12.0013 6V6C12.1854 6 12.3346 6.14924 12.3346 6.33333V12.8667C12.3346 13.0508 12.1854 13.2 12.0013 13.2V13.2C11.8172 13.2 11.668 13.0508 11.668 12.8667V6.33333Z"
              stroke="#FDFDFD"
              strokeWidth="2"
            />
            <path
              d="M10.5 17.5C10.5 16.6716 11.1716 16 12 16C12.8284 16 13.5 16.6716 13.5 17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5Z"
              fill="#FDFDFD"
            />
          </svg>
        ) : data.title === "커뮤니티" ? (
          <CommunityNotification />
        ) : Boolean(data.travelHostUser) ? (
          <TripNotificationIcon heartColor={palette.keycolorBG} circleColor={palette.keycolor} />
        ) : (
          <TripNotificationIcon />
        )}
        <TextContainer>
          <InfoContainer>
            <div>{data.title}</div>
            <TimeContainer>
              <div>{formatTime(data.createdAt)}</div>
              {!data.isRead && <RedDot />}
            </TimeContainer>
          </InfoContainer>
          <Content>{data.content}</Content>
          {data?.title === "신고 접수 경고" && (
            <InquiryButton onClick={() => router.push("/explanation")}>소명 사유 입력</InquiryButton>
          )}
        </TextContainer>
      </TopContainer>
      {data?.title !== "멤버 댓글 알림" && data?.title !== "커뮤니티" && data?.title !== "신고 접수 경고" && (
        <TravelContainer>
          <Badge text="마감" backgroundColor={palette.keycolorBG} color={palette.keycolor} isDueDate={false} />
          <TravelTitle>{data.title}</TravelTitle>
        </TravelContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 20px;
  background-color: #fff;
  padding: 16px 15px;
  box-shadow: 0px 2px 4px 1px #aaaaaa1a;
  width: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${palette.비강조2};
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

const RedDot = styled.div`
  background-color: #ea2a2a;
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;

const Content = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
`;

const InquiryButton = styled.button`
  background-color: ${palette.비강조4};
  border-radius: 40px;
  border: none;
  outline: none;
  height: 42px;
  width: 100%;
  text-align: center;
  padding: 12.5px 0;
  line-height: 17px;
  font-size: 14px;
  font-weight: 600;
  color: ${palette.비강조};
`;
const TravelContainer = styled.div`
  background-color: ${palette.검색창};
  padding: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 16px;
  border-radius: 20px;
`;

const TravelTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 22.4px;
  white-space: nowrap; //텍스트가 한 줄로 유지되도록 설정
  overflow: hidden;
  text-overflow: ellipsis; // 텍스트가 잘릴 때 줄임표(...)를 표시
`;

export default NotificationItem;
