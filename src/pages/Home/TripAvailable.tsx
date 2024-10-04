import styled from '@emotion/styled'
import TitleContainer from './ContentTitleContainer'
import VerticalBoxLayout from '@/components/VerticalBoxLayout'
import { useTripList } from '@/hooks/useTripList'
import { userStore } from '@/store/client/userStore'
import { chunkArray } from '@/utils/array'

import HorizonBoxLayout from '@/components/HorizonBoxLayout'
import dayjs from 'dayjs'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import ThreeRowCarousel from '@/components/ThreeRowCarousel'
import { IMyTripList } from '@/model/myTrip'

const TripAvailable = () => {
  const { data } = useTripList('recent')
  const { name } = userStore()

  const trips = (data?.pages[0].content as IMyTripList['content']) ?? []
  const cutTrips = trips?.length > 9 ? trips.slice(0, 9) : trips
  const refinedTrips = chunkArray(cutTrips)

  // 일단 앞에 몇개만 노출.
  //   const cutTrips = trips.length > 5 ? trips.slice(0, 5) : trips
  console.log(trips)

  return (
    <Container>
      <TitleContainer
        detailLink={`/trip/list?sort=recent`}
        text={
          <>
            지금 참가 가능한 <br /> 여행을 소개해요.
          </>
        }
        minWidth="143px"
      />
      <ThreeRowCarousel>
        {cutTrips &&
          cutTrips?.map(post => (
            <div
              css={{ padding: '18px 16px' }}
              key={post.travelNumber}>
              <HorizonBoxLayout
                travelNumber={post.travelNumber}
                bookmarked={post.bookmarked}
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
export default TripAvailable

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
`
const Box = styled.div`
  margin-right: 16px;
`

// function calcDaysAgo(dateString: string) {
//   const today = new Date()

//   const targetDate = new Date(dateString)

//   const timeDifference = today.getTime() - targetDate.getTime()

//   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

//   return daysDifference
// }

// function daysLeft(dateString: string) {
//   const today = new Date()

//   const targetDate = new Date(dateString)

//   const timeDifference = targetDate.getTime() - today.getTime()

//   // 밀리초를 일 수로 변환
//   const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

//   return daysDifference
// }
