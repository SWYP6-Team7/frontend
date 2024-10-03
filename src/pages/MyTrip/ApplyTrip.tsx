import HorizonBoxLayout from '@/components/HorizonBoxLayout'
import MyTripHorizonBoxLayout from '@/components/MyTripHorizonBoxLayout'
import { useBookmark } from '@/hooks/bookmark/useBookmark'
import { useMyApplyTrip } from '@/hooks/myTrip/useMyApplyTrip'
import { useMyTrip } from '@/hooks/myTrip/useMyTrip'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import ApplyTripIconBtns from './ApplyTripIconBtns'

export default function ApplyTrip() {
  const [ref, inView] = useInView()
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetching } =
    useMyApplyTrip()
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
                <Link to={`/trip/detail/${content.travelNumber}`}>
                  <MyTripHorizonBoxLayout
                    travelNumber={content.travelNumber}
                    userName={content.userName}
                    title={content.title}
                    tags={content.tags}
                    total={content.maxPerson}
                    daysAgo={dayjs().diff(
                      dayjs(content.createdAt, 'YYYY년MM월DD일'),
                      'day'
                    )}
                    daysLeft={dayjs(content.registerDue, 'YYYY년MM월DD일').diff(
                      dayjs(),
                      'day'
                    )}
                    recruits={content.nowPerson}
                    bookmarked={content.bookmarked}
                  />
                </Link>
                <ApplyTripIconBtns
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
}

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
  padding: 11px 16px;
  gap: 8px;
  border-radius: 20px;
  opacity: 0px;
  box-shadow: 0px 2px 4px 3px #aaaaaa14;
  margin-bottom: 16px;
  background-color: ${palette.BG};
  position: relative;
`
