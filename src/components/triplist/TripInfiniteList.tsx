import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useTripList } from '@/hooks/useTripList'
import styled from '@emotion/styled'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import HorizonBoxLayout from '../HorizonBoxLayout'
import dayjs from 'dayjs'
import { Link, useSearchParams } from 'react-router-dom'
import FullHeartIcon from '../icons/FullHeartIcon'
import EmptyHeartIcon from '../icons/EmptyHeartIcon'
import { palette } from '@/styles/palette'
import { authStore } from '@/store/client/authStore'
import { useUpdateBookmark } from '@/hooks/bookmark/useUpdateBookmark'
import { daysAgo } from '@/utils/time'
import CustomLink from '../CustomLink'

const TripInfiniteList = () => {
  const [ref, inView] = useInView()
  const [searchParams, setSearchParams] = useSearchParams()
  const engSort = (() => {
    const value = searchParams.get('sort')
    if (!value || (value !== 'recent' && value !== 'recommend')) {
      return 'recent'
    }
    return value
  })()

  const { data, isFetching, hasNextPage, fetchNextPage, isLoading } =
    useTripList(engSort)
  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage])
  return (
    <Container>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((content, itemIndex) => (
              <BoxContainer key={content.travelNumber}>
                <CustomLink to={`/trip/detail/${content.travelNumber}`}>
                  <HorizonBoxLayout
                    bookmarkNeed={false}
                    bookmarked={content.bookmarked}
                    travelNumber={content.travelNumber}
                    userName={content.userName}
                    title={content.title}
                    tags={content.tags}
                    total={content.maxPerson}
                    location={content.location}
                    daysAgo={daysAgo(content.createdAt)}
                    daysLeft={dayjs(content.registerDue, 'YYYY-MM-DD').diff(
                      dayjs().startOf('day'),
                      'day'
                    )}
                    recruits={content.nowPerson}
                  />
                </CustomLink>
                <BookmarkButton
                  travelNumber={content.travelNumber}
                  bookmarked={content.bookmarked}
                />
              </BoxContainer>
            ))}
          </React.Fragment>
        ))}
      <div
        ref={ref}
        css={{ height: 80 }}
      />
    </Container>
  )
} // 아래 북마크 버튼은 Link에 구속되지 않도록 하는 버튼.
interface BookmarkButtonProps {
  bookmarked: boolean
  travelNumber: number
}
const BookmarkButton = ({ bookmarked, travelNumber }: BookmarkButtonProps) => {
  const { accessToken, userId } = authStore()
  const { postBookmarkMutation, deleteBookmarkMutation } = useUpdateBookmark(
    accessToken!,
    userId!,
    travelNumber
  )
  const bookmarkClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (bookmarked) {
      deleteBookmarkMutation()
    } else {
      // 북마크 추가.
      postBookmarkMutation()
    }
  }

  return (
    <BookmarkBtn onClick={bookmarkClickHandler}>
      {bookmarked ? (
        <FullHeartIcon
          width={24}
          height={21.4}
        />
      ) : (
        <EmptyHeartIcon
          width={24}
          height={21.4}
          stroke={`${palette.비강조3}`}
        />
      )}
    </BookmarkBtn>
  )
}
const BookmarkBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 6px;
`
const Container = styled.div`
  padding: 0 24px;
`

const TopContainer = styled.div`
  margin-bottom: 16px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
`

const BoxContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: relative;
`

export default TripInfiniteList
