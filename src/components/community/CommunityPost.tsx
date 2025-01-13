"use client";
import styled from "@emotion/styled";
import Badge from "../designSystem/Badge";
import { palette } from "@/styles/palette";
import RoundedImage from "../designSystem/profile/RoundedImage";
import { daysAgo, daysAgoFormatted } from "@/utils/time";
import DetailImages from "./DetailImages";
import SearchFilterTag from "../designSystem/tag/SearchFilterTag";
import CommunityHeartIcon from "../icons/CommunityHeartIcon";
import useCommunity from "@/hooks/useCommunity";

import ResultToast from "../designSystem/toastMessage/resultToast";
import { editStore } from "@/store/client/editStore";
import { COMMUNITY_TOAST_MESSAGES } from "@/constants/toastMessages";
import { useParams } from "next/navigation";

const CommunityPost = () => {
  const params = useParams();
  const communityNumber = params?.communityNumber as string;
  const { editToastShow, setEditToastShow } = editStore();

  const {
    community: { data, isLoading },
    images,
    like,
    unlike,
  } = useCommunity(Number(communityNumber));
  console.log("data", data);
  if (isLoading || !data) {
    return <></>;
  }

  const handleLikeToggle = () => {
    if (data.liked) {
      unlike({ communityNumber: Number(communityNumber) });
    } else {
      like({ communityNumber: Number(communityNumber) });
    }
  };
  console.log("date", daysAgoFormatted(data?.regDate));
  return (
    <PostWrapper>
      <ResultToast
        height={120}
        isShow={editToastShow}
        setIsShow={setEditToastShow}
        text={COMMUNITY_TOAST_MESSAGES.editPost}
      />
      <MainContent>
        <BadgeContainer>
          <Badge
            isDueDate={false}
            text={data.categoryName}
            height="22px"
            backgroundColor={palette.비강조4}
            color={palette.비강조}
            fontWeight="600"
          />
        </BadgeContainer>
        <ProfileContainer>
          {/* 프로필 */}
          <RoundedImage src={data.profileImageUrl} size={40} />
          <div style={{ marginLeft: "8px" }}>
            <UserName>{data.postWriter}</UserName>
            <div
              style={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "16.71px",
                color: palette.비강조,
              }}
            >
              {daysAgoFormatted(data?.regDate)}
            </div>
          </div>
        </ProfileContainer>
        {/* 제목  */}
        <Title>{data.title}</Title>
        {/* 내용 */}
        <Details>{data.content}</Details>
        {/*태그   */}

        {!isLoading && images.data && images.data.length > 0 && (
          <ImageContainer>
            <DetailImages images={images.data} />
          </ImageContainer>
        )}

        <LikeContainer onClick={handleLikeToggle}>
          <SearchFilterTag
            addStyle={{
              padding: "11px 16px",
              fontSize: "16px",
              backgroundColor: data.liked ? palette.keycolorBG : palette.검색창,
              color: data.liked ? palette.keycolor : palette.기본,
              border: data.liked ? `1px solid ${palette.keycolor}` : "none",
              borderRadius: "30px",
            }}
            icon={<CommunityHeartIcon />}
            text={data.likeCount > 0 ? `${data.likeCount}` : "좋아요"}
            idx={0}
          />
        </LikeContainer>
      </MainContent>
      <ViewsETC>
        <div>댓글 {data.commentCount}</div>
        <div style={{ margin: "0px 4px" }}> · </div>
        <div>좋아요 {data.likeCount}</div>
        <div style={{ margin: "0px 4px" }}> · </div>
        <div>조회수 {data.viewCount}</div>
      </ViewsETC>
    </PostWrapper>
  );
};

const PostWrapper = styled.div`
  background-color: ${palette.BG};
  padding: 24px;

  top: 100px;
  left: 24px;
  gap: 32px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 3px rgba(170, 170, 170, 0.18);
`;
const MainContent = styled.div``;

const ViewsETC = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${palette.비강조4};
  padding-top: 16px;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${palette.비강조2};
`;
const BadgeContainer = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  margin-top: 3.8svh;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.25px;
  text-align: left;
`;
const Details = styled.div`
  margin-top: 1.9svh;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: ${palette.기본};
`;

const ImageContainer = styled.div`
  margin-top: 3.8svh;
`;
const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: ${palette.기본};
  margin-bottom: 4px;
`;

const LikeContainer = styled.div`
  margin: 3.8svh 0;
  cursor: pointer;
`;

export default CommunityPost;
