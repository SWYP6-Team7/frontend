"use client";
import styled from "@emotion/styled";
import TitleContainer from "./ContentTitleContainer";
import { useTripList } from "@/hooks/useTripList";
import HorizonBoxLayout from "@/components/HorizonBoxLayout";
import dayjs from "dayjs";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThreeRowCarousel from "@/components/ThreeRowCarousel";
import { IMyTripList } from "@/model/myTrip";
import { daysAgo } from "@/utils/time";
import Link from "next/link";
import { palette } from "@/styles/palette";

const TripAvailable = () => {
  const { data } = useTripList("recent");

  const trips = (data?.pages[0].content as IMyTripList["content"]) ?? [];
  const cutTrips = trips?.length > 9 ? trips.slice(0, 9) : trips;

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
          cutTrips?.map((post, idx) => {
            return (
              <BoxContainer key={post.travelNumber}>
                <Box style={idx === cutTrips.length - 1 ? { borderBottom: 0 } : {}}>
                  <Link href={`/trip/detail/${post.travelNumber}`}>
                    <HorizonBoxLayout
                      travelNumber={post.travelNumber}
                      location={post.location}
                      bookmarked={post.bookmarked}
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
            );
          })}
      </ThreeRowCarousel>
    </Container>
  );
};
export default TripAvailable;

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
`;
const BoxContainer = styled.div``;

const Box = styled.div`
  border-bottom: 1px solid ${palette.비강조4};

  margin: 0 16px;
  padding: 18px 0;
`;