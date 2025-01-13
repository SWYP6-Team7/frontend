"use client";
import styled from "@emotion/styled";
import TitleContainer from "./ContentTitleContainer";
import { useTripList } from "@/hooks/useTripList";
import ThreeRowCarousel from "@/components/ThreeRowCarousel";
import HorizonBoxLayout from "@/components/HorizonBoxLayout";
import dayjs from "dayjs";
import { IMyTripList } from "@/model/myTrip";
import { daysAgo } from "@/utils/time";
import Link from "next/link";

const TripRecommendation = () => {
  const { data } = useTripList("recommend");
  const trips = (data?.pages[0].content as IMyTripList["content"]) ?? [];
  const cutTrips = trips?.length > 9 ? trips.slice(0, 9) : trips;

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
          cutTrips?.map((post) => (
            <BoxContainer key={post.travelNumber} className="box-container">
              <Box className="box-container">
                <Link href={`/trip/detail/${post.travelNumber}`}>
                  <HorizonBoxLayout
                    bookmarked={post.bookmarked}
                    location={post.location}
                    travelNumber={post.travelNumber}
                    showTag={false}
                    bookmarkPosition="middle"
                    userName={post.userName}
                    tags={post.tags}
                    daysAgo={daysAgo(post?.createdAt)}
                    daysLeft={dayjs(post.registerDue, "YYYY-MM-DD").diff(dayjs().startOf("day"), "day")}
                    title={post.title}
                    recruits={post.nowPerson}
                    total={post.maxPerson}
                  />
                </Link>
              </Box>
            </BoxContainer>
          ))}
      </ThreeRowCarousel>
    </Container>
  );
};
export default TripRecommendation;

const Container = styled.div`
  margin-top: 40px;
`;
const BoxContainer = styled.div`
  padding: 18px 16px;
`;
const Box = styled.div`
  margin: 0 16px;
`;
