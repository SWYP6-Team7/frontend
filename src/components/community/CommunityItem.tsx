"use client";
import styled from "@emotion/styled";
import React from "react";
import SearchFilterTag from "../designSystem/tag/SearchFilterTag";
import { palette } from "@/styles/palette";
import EmptyHeartIcon from "../icons/EmptyHeartIcon";
import CommentIcon from "../icons/CommentIcon";
import { ICommunityItem } from "@/model/community";
import { daysAgoFormatted } from "@/utils/time";

const CommunityItem = ({ data }: { data: ICommunityItem }) => {
  return (
    <Container>
      <TopContainer>
        <TopContent>
          <div>
            <SearchFilterTag
              text={data.categoryName}
              idx={0}
              addStyle={{
                backgroundColor: palette.비강조4,
                color: palette.비강조,
                border: "none",
                borderRadius: "12px",
                fontSize: "12px",
                padding: "4px 10px",
                fontWeight: "400",
              }}
            />
          </div>

          <Title>{data.title}</Title>
          <Content>{data.content}</Content>
        </TopContent>
        {data.thumbnailUrl && <ImgDiv src={data.thumbnailUrl} />}
      </TopContainer>
      <BottomContainer>
        <UserBox>
          <div>{data.postWriter}</div>
          <Dot>·</Dot>
          <div>{daysAgoFormatted(data.regDate)}</div>
          <Dot>·</Dot>
          <div>조회수 {data.viewCount}</div>
        </UserBox>
        <InfoContainer>
          <IconContainer>
            <Icon>
              <EmptyHeartIcon width={17.42} height={15.19} stroke={palette.비강조2} />
            </Icon>
            <span>{data.likeCount}</span>
          </IconContainer>
          <IconContainer>
            <Icon>
              <CommentIcon size={15} stroke={palette.비강조2} />
            </Icon>
            <span>{data.commentCount}</span>
          </IconContainer>
        </InfoContainer>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 133px;
  justify-content: center;
  border-bottom: 1px solid ${palette.비강조4};
  padding: 11px 0 16px 0;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;

const TopContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  gap: 8px;
`;

const ImgDiv = styled.div<{ src: string }>`
  border-radius: 20px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  height: 100%;
  width: 74px;
  aspect-ratio: 1;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-left: 4px;
  line-height: 19.09px;
`;
const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  padding-left: 4px;
  line-height: 16.71px;
  white-space: nowrap; //텍스트가 한 줄로 유지되도록 설정
  overflow: hidden;
  text-overflow: ellipsis; // 텍스트가 잘릴 때 줄임표(...)를 표시
  color: ${palette.비강조};
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 4px;
`;

const UserBox = styled.div`
  display: flex;
  gap: 4px;

  color: ${palette.비강조2};
  font-size: 12px;
  text-align: center;
  line-height: 16.71px;
  font-weight: 400;
  flex: 1;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const Dot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.비강조3};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.비강조2};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;

  gap: 8px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default CommunityItem;
