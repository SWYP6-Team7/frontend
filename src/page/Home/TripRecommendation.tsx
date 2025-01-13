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
import { palette } from "@/styles/palette";

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
          cutTrips?.map((post, idx) => (
            <BoxContainer key={post.travelNumber}>
              <Box style={idx === cutTrips.length - 1 ? { backgroundColor: "yellow" } : { borderBottom: 0 }}>
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
const BoxContainer = styled.div``;
const Box = styled.div`
  &:last-of-type {
    border-bottom: 0px;
  }

  border-bottom: 1px solid ${palette.비강조4};

  margin: 0 16px;
  padding: 18px 16px;
`;
