"use client";
import { SpotType } from "@/model/trip";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const TripCarouselItem = ({ spots }: { spots: SpotType[] }) => {
  const [topRef, topInview] = useInView();
  const [bottomRef, bottomInview] = useInView();
  const [inView, setInview] = useState({
    top: false,
    bottom: false,
  });

  useEffect(() => {
    if (topInview) {
      setInview((prev) => ({ ...prev, top: true }));
    } else {
      setInview((prev) => ({ ...prev, top: false }));
    }

    if (bottomInview) {
      setInview((prev) => ({ ...prev, bottom: true }));
    } else {
      setInview((prev) => ({ ...prev, bottom: false }));
    }
  }, [topInview, bottomInview]);
  return (
    <div style={{ position: "relative" }}>
      <TopShadow isOverThree={spots.length > 3} isTop={inView.top} />
      <ContentContainer isTop={inView.top} isBottom={inView.bottom} isOverThree={spots.length > 3}>
        <div ref={topRef} style={{ width: "100%", height: 1 }} />
        {spots.map((spot, idx) => (
          <SpotItem isLast={idx === spots.length - 1}>
            <LeftContainer>
              <Index>{idx + 1}</Index>
              <TextContainer>
                <SpotTitle>{spot.name}</SpotTitle>
                <Description>
                  {spot.category} · {spot.region}
                </Description>
              </TextContainer>
            </LeftContainer>
          </SpotItem>
        ))}
        <div ref={bottomRef} style={{ width: "100%", height: 1 }} />
      </ContentContainer>
      <BottomShadow isOverThree={spots.length > 3} isBottom={inView.bottom} />
    </div>
  );
};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SpotTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  line-height: 19px;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${palette.비강조};
  line-height: 14px;
`;

const SpotItem = styled.li<{ isLast: boolean }>`
  display: flex;
  margin-bottom: ${(props) => (props.isLast ? "0" : "15px")};
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease-out;
  height: 58px;
  user-select: none;
  touch-action: none;
`;

const Index = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 18px;
  border-radius: 100px;
  height: 18px;
  background-color: ${palette.기본};
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const TopShadow = styled.div<{
  isOverThree: boolean;
  isTop: boolean;
}>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 14px;
  z-index: 1;
  background: linear-gradient(to bottom, ${palette.BG}, transparent);
  opacity: ${(props) => (props.isOverThree && props.isTop ? 1 : 0)};
  pointer-events: none;
`;

const BottomShadow = styled.div<{
  isOverThree: boolean;
  isBottom: boolean;
}>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 14px;
  z-index: 1;
  background: linear-gradient(to top, ${palette.BG}, transparent);
  opacity: ${(props) => (props.isOverThree && props.isBottom ? 1 : 0)};
  pointer-events: none;
`;

const ContentContainer = styled.div`
  max-height: 260px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 20px;
  position: relative;
`;

export default TripCarouselItem;
