"use client";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useBookmark } from "@/hooks/bookmark/useBookmark";
import TitleContainer from "./ContentTitleContainer";
import { daysAgo } from "@/utils/time";
import HorizonBoxLayout from "@/components/HorizonBoxLayout";
import dayjs from "dayjs";
import { IMyTripList } from "@/model/myTrip";
import { isGuestUser } from "@/utils/user";
import { palette } from "@/styles/palette";
import { useBackPathStore } from "@/store/client/backPathStore";
const BookmarkContainer = () => {
  const router = useRouter();
  const { setTravelDetail } = useBackPathStore();
  const { data } = useBookmark();
  const bookmarks = data?.pages[0].content as IMyTripList["content"];

  const handleClickEmpty = () => {
    if (isGuestUser()) {
      router.push("/login");
    } else {
      router.push("/search/travel");
    }
  };

  const clickTrip = (travelNumber: number) => {
    setTravelDetail(`/`);

    router.push(`/trip/detail/${travelNumber}`);
  };

  return (
    <BookmarkBox>
      <TitleContainer text="즐겨찾기" detailLink="/myTrip" linkText="즐겨찾기" />
      <ContentList>
        {/* Empty는 북마크 한 것이 없을 때,로그인 안할 때. 보여줄 div */}
        {bookmarks === undefined && (
          <EmptyBox>
            <Empty>
              <img
                // 클릭시,여행 찾기 페이지로 이동 예정
                onClick={handleClickEmpty}
                src="/images/bookmarkPlus.png"
                alt="여행 찾기 페이지 이동 이미지"
              />
              {isGuestUser() ? (
                <span style={{ color: palette.비강조 }}>
                  로그인 후 여행을 즐겨찾기
                  <br /> 해보세요.
                </span>
              ) : (
                <span>여행을 즐겨찾기 해보세요!</span>
              )}
            </Empty>
          </EmptyBox>
        )}
        {bookmarks &&
          (bookmarks.length === 0 ? (
            <EmptyBox>
              <Empty>
                <img
                  // 클릭시,여행 찾기 페이지로 이동 예정
                  onClick={() => router.push("/search/travel")}
                  src="/images/bookmarkPlus.png"
                  alt=""
                />
                <span>여행을 즐겨찾기 해보세요!</span>
              </Empty>
            </EmptyBox>
          ) : (
            <BookmarkList>
              {bookmarks.map(
                (post, idx) =>
                  post.bookmarked && (
                    <BookmarkPreviewBox onClick={() => clickTrip(post.travelNumber)} key={idx}>
                      <HorizonBoxLayout
                        isBookmark={bookmarks.length > 1}
                        bookmarked={post.bookmarked}
                        travelNumber={post.travelNumber}
                        bookmarkNeed={false}
                        isBar={true}
                        bookmarkPosition="top"
                        userName={post.userName}
                        location={post.location}
                        tags={post.tags}
                        daysAgo={daysAgo(post?.createdAt)}
                        daysLeft={dayjs(post.registerDue, "YYYY-MM-DD").diff(dayjs().startOf("day"), "day")}
                        title={post.title}
                        recruits={post.nowPerson}
                        total={post.maxPerson}
                      />
                    </BookmarkPreviewBox>
                  )
              )}
            </BookmarkList>
          ))}
      </ContentList>
    </BookmarkBox>
  );
};
export default BookmarkContainer;
const BookmarkPreviewBox = styled.div`
  display: flex;
  min-width: 250px;
  align-items: center;
  border-radius: 20px;
  padding: 16px;
  padding-top: 11px;
  background-color: white;
  margin-right: 16px;
`;
const BookmarkList = styled.div`
  display: flex;
  margin-right: -24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BookmarkBox = styled.div`
  margin-top: 32px;
`;
const EmptyBox = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  background-color: white;
  border-radius: 20px;
`;
const Empty = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 16px;
    font-weight: 400;
    line-height: 22.4px;
  }
  img {
    height: 62px;
    width: 62px;
  }
`;

const ContentList = styled.div``;
