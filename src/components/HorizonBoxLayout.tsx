"use client";
import styled from "@emotion/styled";
import Badge from "./designSystem/Badge";
import PersonIcon from "./icons/PersonIcon";
import BoxLayoutTag from "./designSystem/tag/BoxLayoutTag";
import EmptyHeartIcon from "./icons/EmptyHeartIcon";
import { palette } from "@/styles/palette";
import PlaceIcon from "./icons/PlaceIcon";
import FullHeartIcon from "./icons/FullHeartIcon";
import { useUpdateBookmark } from "@/hooks/bookmark/useUpdateBookmark";
import { authStore } from "@/store/client/authStore";
import { useState } from "react";
import CheckingModal from "./designSystem/modal/CheckingModal";
import { usePathname, useRouter } from "next/navigation";
import { isGuestUser } from "@/utils/user";
import { useBackPathStore } from "@/store/client/backPathStore";
interface HorizonBoxProps {
  daysLeft: number;
  title: string;
  recruits: number;
  total: number;
  isBookmark?: boolean;
  location?: string;
  userName: string;
  daysAgo: string;
  imgSrc?: string; // 이미지 없는 경우 대비.
  tags: string[];
  showTag?: boolean;
  isBar?: boolean;
  bookmarkPosition?: "top" | "middle";
  bookmarkNeed?: boolean; // false면 필요 없거나, Link에 속하지 않는 버튼을 따로 사용.
  bookmarked: boolean;
  travelNumber: number;
}
// 사용 방식
{
  /* <HorizonBoxLayout
        daysLeft={40}
        title="먹고죽는 유럽여행"
        recruits={2}
        total={5}
        imgSrc="/경로"
        description="바게트만 부시는 테마 여행 갈사람 여기..."
        userName="김모잉"
        daysAgo={3}
        tags={array}
      /> */
}

const HorizonBoxLayout = ({
  bookmarked,
  daysLeft,
  title,
  recruits,
  total,
  isBookmark = false,
  location = "",
  userName,
  daysAgo,
  isBar = false,
  showTag = true,
  bookmarkPosition = "top",
  tags,
  bookmarkNeed = true,
  travelNumber,
}: HorizonBoxProps) => {
  const cutTags = tags.length > 2 ? (isBookmark ? tags.slice(0, 1) : tags.slice(0, 2)) : tags;

  return (
    <HorizonBoxContainer>
      {/* <Thumbnail src={imgSrc}></Thumbnail> */}

      <PostInfo>
        <TopContainer>
          <BadgeContainer isMargin={bookmarkPosition === "middle"}>
            <Badge
              height={"22px"}
              text={"마감"}
              backgroundColor={"rgba(227, 239, 217, 1)"}
              color={`${palette.keycolor}`}
              daysLeft={daysLeft >= 0 ? daysLeft : undefined}
              isClose={!Boolean(daysLeft >= 0)}
              isDueDate={Boolean(daysLeft >= 0)}
            />
          </BadgeContainer>
          {bookmarkPosition === "top" && bookmarkNeed && (
            <BookmarkButton travelNumber={travelNumber} bookmarked={bookmarked} bookmarkPosition={bookmarkPosition} />
          )}
        </TopContainer>
        <div>
          <TitleBox>
            <Title>{title}</Title>
          </TitleBox>
          {/* <Description>{description}</Description> */}
          <UserBox>
            <UserName>{userName}</UserName>
            <Dot>·</Dot>
            <RecruitingBox>
              <PersonIcon stroke={`${palette.비강조}`} />

              <Recruiting>
                {recruits}/{total}
              </Recruiting>
            </RecruitingBox>
            <Dot>·</Dot>
            <div>{daysAgo}</div>
          </UserBox>
        </div>
        {isBar && <Bar />}
        {showTag && (
          <Tags>
            <BoxLayoutTag
              text={
                <Location>
                  <PlaceIcon height={12} width={10} />
                  <div>{location}</div>
                </Location>
              }
            />
            {cutTags.map((text: string, idx) => (
              <BoxLayoutTag key={idx} text={text} />
            ))}
            {tags.length > cutTags.length ? (
              <BoxLayoutTag
                addStyle={{
                  backgroundColor: `${palette.비강조4}`,
                  padding: "4px 6px 4px 6px",
                  color: `${palette.비강조}`,
                  height: "22px",
                  borderRadius: "20px",
                  fontSize: "12px",
                }}
                text={`+${tags.length - cutTags.length}`}
              />
            ) : null}
          </Tags>
        )}
      </PostInfo>
      {bookmarkPosition === "middle" && bookmarkNeed && (
        <BookmarkButton travelNumber={travelNumber} bookmarked={bookmarked} bookmarkPosition={bookmarkPosition} />
      )}
    </HorizonBoxContainer>
  );
};
interface BookmarkButtonProps {
  bookmarked: boolean;
  travelNumber: number;
  bookmarkPosition?: "top" | "middle";
}
const BookmarkButton = ({ bookmarked, travelNumber, bookmarkPosition }: BookmarkButtonProps) => {
  const { accessToken, userId } = authStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const { postBookmarkMutation, deleteBookmarkMutation } = useUpdateBookmark(accessToken!, userId!, travelNumber);
  const pathname = usePathname();

  const bookmarkClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isGuestUser()) {
      setShowLoginModal(true);
      return;
    }
    if (bookmarked) {
      deleteBookmarkMutation();
    } else {
      // 북마크 추가.
      postBookmarkMutation();
    }
  };
  return (
    <>
      <CheckingModal
        isModalOpen={showLoginModal}
        onClick={() => {
          localStorage.setItem("loginPath", pathname);
          router.push("/login");
        }}
        modalMsg={`로그인 후 이용할 수 있어요.\n로그인 하시겠어요?`}
        modalTitle="로그인 안내"
        modalButtonText="로그인"
        setModalOpen={setShowLoginModal}
      />
      <Button isMargin={bookmarkPosition === "middle"} onClick={bookmarkClickHandler}>
        {bookmarked ? (
          <FullHeartIcon width={24} height={21.4} />
        ) : (
          <EmptyHeartIcon width={24} height={21.4} stroke={`${palette.비강조3}`} />
        )}
      </Button>
    </>
  );
};

const Bar = styled.div`
  margin-bottom: 8px;
  width: 100%;
  height: 1px;
  background-color: ${palette.비강조4};
`;

const Button = styled.button<{ isMargin: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;

  margin-top: ${(props) => (props.isMargin ? "11px" : 0)};
  margin-bottom: ${(props) => (props.isMargin ? "4px" : 0)};
  align-items: center;
  justify-content: center;
`;

const HorizonBoxContainer = styled.div`
  width: 100%;
  /* height: 120px; */
  display: flex;
  align-items: center;
`;
const TitleBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-right: 8px;
  line-height: 19px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.비강조3};
`;

const RecruitingBox = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
  align-items: center;
`;

const Recruiting = styled.div`
  padding-left: 1.6px;
`;
const PostInfo = styled.div`
  width: 100%;
  flex: 1;
`;
const UserBox = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  color: ${palette.비강조};
  font-size: 12px;
  text-align: center;
  line-height: 17px;
  font-weight: 400;
`;
const UserName = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;

  color: ${palette.기본};
`;
const Tags = styled.div`
  display: flex;
  justify-content: space-betweens;
`;

const BadgeContainer = styled.div<{ isMargin: boolean }>`
  margin-top: ${(props) => (props.isMargin ? "8px" : 0)};
  margin-bottom: ${(props) => (props.isMargin ? "8px" : 0)};
`;
export default HorizonBoxLayout;
