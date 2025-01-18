"use client";
import styled from "@emotion/styled";
import Badge from "./designSystem/Badge";
import Spacing from "./Spacing";
import PersonIcon from "./icons/PersonIcon";
import { palette } from "@/styles/palette";
import EmptyHeartIcon from "./icons/EmptyHeartIcon";

import FullHeartIcon from "./icons/FullHeartIcon";

interface VerticalBoxProps {
  postId: string;
  daysLeft: number;
  title: string;
  recruits: number;
  total: number;
  description: string;
  userName: string;
  daysAgo: number;
  imgSrc?: string;
  tags: string[];
  userIdBookmarked: string[];
}

const VerticalBoxLayout = ({
  postId,
  daysLeft,
  title,
  recruits,
  total,
  description,
  userName,
  daysAgo,
  imgSrc = "",
  tags,
  userIdBookmarked,
}: VerticalBoxProps) => {
  const cutTagList = tags.length > 3 ? tags.slice(0, 2) : tags;
  // const { userId, accessToken } = authStore()
  const userId = "1"; // 임시적.

  // const { updateBookmark } = useUpdateBookmark(userId, postId)

  let isBookmarked: boolean = false;
  if (userId !== null)
    // 유저가 로그인 했다면, 북마크 정보를 표시.
    isBookmarked = userIdBookmarked.some((id: string) => id === userId.toString());

  const bookmarkClickHandler = () => {
    // 북마크 추가 또는 제거 api 요청.
    // updateBookmark()
  };
  return (
    <Container>
      <Image src={imgSrc}>
        <BadgeContainer>
          <Badge text="마감까지" width="100%" borderRadius="0px 0px 20px 20px" daysLeft={daysLeft} />
        </BadgeContainer>

        <HeartContainer onClick={bookmarkClickHandler}>
          {isBookmarked ? <FullHeartIcon /> : <EmptyHeartIcon />}
        </HeartContainer>
      </Image>
      <Spacing size={8} />
      <TextContainer>
        <TitleContainer>
          <Title>{title}</Title>
          <PersonContainer>
            <PersonIcon width={9} height={10.8} />
            <RecruitingText>
              {recruits}/{total}
            </RecruitingText>
          </PersonContainer>
        </TitleContainer>
        <Spacing size={8} />
        <Description>{description}</Description>
        <Spacing size={7} />
        <Info>
          {userName === "" ? "김모잉" : userName}&nbsp;&#183;&nbsp;{daysAgo}
          일&nbsp;전
        </Info>
        <Spacing size={8} />
        <TagList>
          {cutTagList.map((text: string) => (
            // <BoxLayoutTag
            //   key={text}
            //   text={text}
            //   backgroundColor={palette.비강조4}
            //   color={palette.비강조}
            // />
            <></>
          ))}
        </TagList>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  flex-direction: column;
  max-width: 180px;
  justify-content: center;
`;

const Image = styled.div<{ src: string }>`
  position: relative;
  width: 171px;
  height: 176px;
  border-radius: 20px;
  background-image: url(${(props) => props.src});
  background-size: cover;
`;
const BadgeContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border: 0px 0px 20px 20px;
`;
const HeartContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h4`
  font-weight: 700;
  font-size: 16px;
  line-height: 19.09px;
  color: ${palette.기본};
  text-align: left;
`;

const Description = styled.p`
  font-size: 14px;
  color: #ababab;
  line-height: 16.71px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TextContainer = styled.div`
  padding-left: 8px;
  padding-right: 5px;
`;

const TagList = styled.div`
  display: flex;

  align-items: center;
`;

const PersonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 31px;
  height: 14px;
`;

const Info = styled.div`
  font-size: 14px;
  line-height: 16.71px;
`;
const RecruitingText = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;
  display: flex;
  align-items: center;
  width: 18px;
  height: 14px;
  color: ${palette.keycolor};
`;

export default VerticalBoxLayout;
