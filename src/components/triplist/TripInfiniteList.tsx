import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useTripAvailable } from '@/hooks/useTripAvailable'
import styled from '@emotion/styled'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import HorizonBoxLayout from '../HorizonBoxLayout'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const TripInfiniteList = () => {
  const [ref, inView] = useInView()
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetching } =
    useTripAvailable()
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
                  <HorizonBoxLayout
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
                  />
                </Link>
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
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
`

export default TripInfiniteList
