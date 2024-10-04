import styled from '@emotion/styled'
import TitleContainer from './ContentTitleContainer'
import VerticalBoxLayout from '@/components/VerticalBoxLayout'

import { userStore } from '@/store/client/userStore'
import { useTripList } from '@/hooks/useTripList'
import ThreeRowCarousel from '@/components/ThreeRowCarousel'
import HorizonBoxLayout from '@/components/HorizonBoxLayout'
import dayjs from 'dayjs'
import { IMyTripList } from '@/model/myTrip'

const TripRecommendation = () => {
  const { data } = useTripList('recommend')
  const { name } = userStore()

  const trips = (data?.pages[0].content as IMyTripList['content']) ?? []
  const cutTrips = trips?.length > 9 ? trips.slice(0, 9) : trips

  return (
    <Container>
      <TitleContainer
        detailLink={`/trip/list?sort=recommend`}
        text={
          <>
            이런 여행은 <br /> 어떠세요?
          </>
        }
        minWidth="102px"
      />
      <ThreeRowCarousel>
        {cutTrips &&
          cutTrips?.map(post => (
            <div
              css={{ padding: '18px 16px' }}
              key={post.travelNumber}>
              <HorizonBoxLayout
                bookmarked={post.bookmarked}
                travelNumber={post.travelNumber}
                showTag={false}
                bookmarkPosition="middle"
                userName={post.userName}
                tags={post.tags}
                daysAgo={dayjs().diff(
                  dayjs(post.createdAt, 'YYYY년MM월DD일'),
                  'day'
                )}
                daysLeft={dayjs(post.registerDue, 'YYYY년MM월DD일').diff(
                  dayjs(),
                  'day'
                )}
                title={post.title}
                recruits={post.nowPerson}
                total={post.maxPerson}
              />
            </div>
          ))}
      </ThreeRowCarousel>
    </Container>
  )
}
export default TripRecommendation

const Container = styled.div`
  margin-top: 40px;
`
const Box = styled.div`
  margin-right: 16px;
`
