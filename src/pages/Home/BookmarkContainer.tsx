import styled from '@emotion/styled'
import ArrowIcon from '@/components/icons/ArrowIcon'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/designSystem/Badge'
import { useBookmark } from '@/hooks/bookmark/useBookmark'
import TitleContainer from './ContentTitleContainer'
import { daysLeft, daysAgo } from '@/utils/time'
import { palette } from '@/styles/palette'
import { ITripList } from '@/model/trip'
import HorizonBoxLayout from '@/components/HorizonBoxLayout'
import dayjs from 'dayjs'
import { IMyTripList } from '@/model/myTrip'
const BookmarkContainer = () => {
  const navigate = useNavigate()
  // 북마크 가져오기

  const { data } = useBookmark()
  const bookmarks = data?.pages[0].content as IMyTripList['content']

  console.log(bookmarks, 'bookmarks')
  return (
    <BookmarkBox>
      <TitleContainer text="즐겨찾기" />
      <ContentList>
        {/* Empty는 북마크 한 것이 없을 때,로그인 안할 때. 보여줄 div */}
        {bookmarks === undefined && (
          <EmptyBox>
            <Empty>
              <img
                // 클릭시,여행 찾기 페이지로 이동 예정
                onClick={() => navigate('/search/travel')}
                src="/images/bookmarkPlus.png"
                alt=""
              />
              <span>여행을 즐겨찾기 해보세요!</span>
            </Empty>
          </EmptyBox>
        )}
        {bookmarks &&
          (bookmarks.length === 0 ? (
            <EmptyBox>
              <Empty>
                <img
                  // 클릭시,여행 찾기 페이지로 이동 예정
                  onClick={() => navigate('/search/travel')}
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
                    <BookmarkPreviewBox key={idx}>
                      <HorizonBoxLayout
                        bookmarked={post.bookmarked}
                        travelNumber={post.travelNumber}
                        bookmarkNeed={false}
                        isBar={true}
                        bookmarkPosition="top"
                        userName={post.userName}
                        location={post.location}
                        tags={post.tags}
                        daysAgo={daysAgo(post?.createdAt)}
                        daysLeft={dayjs(post.registerDue, 'YYYY-MM-DD').diff(
                          dayjs(),
                          'day'
                        )}
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
  )
}
export default BookmarkContainer
const BookmarkPreviewBox = styled.div`
  display: flex;
  min-width: 235px;
  align-items: center;
  border-radius: 20px;
  padding: 16px;
  background-color: white;
  margin-right: 16px;
`
const BookmarkList = styled.div`
  display: flex;
  margin-right: -24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`
const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  img {
    width: 71px;
    height: 71px;
    border-radius: 50px;
  }
`
const Info = styled.div`
  width: 130px;
  height: 69px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div:nth-of-type(1) {
    margin-bottom: 5px;
  }
  div:nth-of-type(2) {
    font-size: 16px;
    font-weight: 700;
    line-height: 22.4px;
  }
  div:nth-of-type(3) {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.71px;
    color: rgba(132, 132, 132, 1);
  }
`
const BookmarkBox = styled.div`
  margin-top: 32px;
`
const EmptyBox = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  background-color: white;
  border-radius: 20px;
`
const Empty = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 16px;
    font-weight: 400;
    line-height: 22.4px;
  }
`

const ContentList = styled.div`
  margin-top: 16px;
`
