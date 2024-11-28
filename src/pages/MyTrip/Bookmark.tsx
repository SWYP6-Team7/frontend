import MyTripHorizonBoxLayout from '@/components/MyTripHorizonBoxLayout'
import { useBookmark } from '@/hooks/bookmark/useBookmark'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import BookmarkIconBtns from './BookmarkIconBtns'
import RoundedImage from '@/components/designSystem/profile/RoundedImage'

import { IMyTripList } from '@/model/myTrip'

import { daysAgo } from '@/utils/time'

export default function Bookmark() {
  const [ref, inView] = useInView()
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useBookmark()
  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage])

  const trips = (data?.pages[0].content as IMyTripList['content']) ?? []

  const isNoData = trips.length === 0
  return (
    <Container isNodata={isNoData}>
      {isNoData && (
        <Empty>
          <RoundedImage
            size={80}
            src="/images/noData.png"
          />
          <NoData
            css={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
            아직 저장된 <br /> 여행이 없어요
          </NoData>
        </Empty>
      )}
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content?.map(
              ({
                travelNumber,
                userName,
                location,
                title,
                tags,
                maxPerson,
                createdAt,
                registerDue,
                nowPerson,
                bookmarked
              }) => (
                <BoxContainer key={travelNumber}>
                  <Link to={`/trip/detail/${travelNumber}`}>
                    <MyTripHorizonBoxLayout
                      travelNumber={travelNumber}
                      userName={userName}
                      location={location}
                      title={title}
                      tags={tags}
                      total={maxPerson}
                      daysAgo={daysAgo(createdAt)}
                      daysLeft={dayjs(registerDue, 'YYYY-MM-DD').diff(
                        dayjs().startOf('day'),
                        'day'
                      )}
                      recruits={nowPerson}
                      bookmarked={bookmarked}
                    />
                  </Link>
                  <BookmarkIconBtns
                    travelNumber={travelNumber}
                    bookmarked={bookmarked}
                  />
                </BoxContainer>
              )
            )}
          </React.Fragment>
        ))}

      <div
        ref={ref}
        css={{ height: 80 }}
      />
    </Container>
  )
}
const NoData = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: center;
  color: ${palette.기본};
`
const Empty = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
`
const Container = styled.div<{ isNodata: boolean | undefined }>`
  padding: 0 24px;
  position: relative;
  display: ${props => (props.isNodata ? 'flex' : 'auto')};
  justify-content: center;
  align-items: center;
`
const BoxContainer = styled.div`
  position: relative;
  padding: 11px 16px;
  gap: 8px;
  border-radius: 20px;
  opacity: 0px;
  box-shadow: 0px 2px 4px 3px #aaaaaa14;
  margin-bottom: 16px;
  background-color: ${palette.BG};
`
