import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";
import { getDateByIndex } from "@/utils/time";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import { SpotType } from "@/store/client/createTripStore";
import Spacing from "./Spacing";
import { useInView } from "react-intersection-observer";

type PropType = {
  slides: { planOrder: number; spots: SpotType[] }[];
  options?: EmblaOptionsType;
  startDate: string;
  inView?: React.ReactNode;
  openItemIndex: number;
  setOpenItemIndex: React.Dispatch<React.SetStateAction<number>>;
};

const TripCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [topRef, topInview] = useInView();
  const [bottomRef, bottomInview] = useInView();
  const [inView, setInview] = useState({
    top: false,
    bottom: false,
  });

  const updateSelectedIndex = () => {
    if (emblaApi) {
      props.setOpenItemIndex(emblaApi.selectedScrollSnap());
    }
  };

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
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", updateSelectedIndex); // 슬라이드 변경 시 호출
      updateSelectedIndex(); // 초기값 설정
    }
  }, [emblaApi]);

  return (
    <Embla>
      <Viewport ref={emblaRef}>
        <Container>
          {slides?.map((item, index) => (
            <Slide key={index}>
              <Item>
                <Tab>
                  <TitleContainer>
                    <Title>Day {index + 1}</Title>
                    <Date>{getDateByIndex(props.startDate, index + 1)}</Date>
                    <Count>{item.spots.length}</Count>
                  </TitleContainer>
                  <Spacing size={16} />
                  <div style={{ position: "relative" }}>
                    <TopShadow isOverThree={item.spots.length > 3} isTop={inView.top} />
                    <ContentContainer isTop={inView.top} isBottom={inView.bottom} isOverThree={item.spots.length > 3}>
                      <div ref={topRef} style={{ width: "100%", height: 1 }} />
                      {item.spots.map((spot, idx) => (
                        <SpotItem isLast={idx === item.spots.length - 1}>
                          <LeftContainer>
                            <Index>{idx + 1}</Index>
                            <TextContainer>
                              <SpotTitle>{spot.name}</SpotTitle>
                              <Description>
                                {spot.category} {spot.region}
                              </Description>
                            </TextContainer>
                          </LeftContainer>
                        </SpotItem>
                      ))}
                      <div ref={bottomRef} style={{ width: "100%", height: 1 }} />
                    </ContentContainer>
                    <BottomShadow isOverThree={item.spots.length > 3} isBottom={inView.bottom} />
                  </div>
                </Tab>
              </Item>
              {index === slides.length - 1 && props.inView}
            </Slide>
          ))}
        </Container>
      </Viewport>
    </Embla>
  );
};

const Embla = styled.div`
  max-width: 48rem;

  --slide-height: 19rem;

  --slide-size: 70%;
`;
const Viewport = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(12px * -1);
`;
const Slide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 87%;
  min-width: 0;
  padding-left: 12px;
`;

const Item = styled.div`
  padding: 20px 0;
  background-color: #fff;
  border-radius: 20px;
  user-select: none;
`;

const Tab = styled.label<{
  tabLineHeight: string;
  tabPadding: string;
  fontWeight: number;
}>`
  font-size: 16px;
  line-height: 16px;

  height: 42px;
  padding: 0 20px;
`;

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

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #000;
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

const Count = styled.div`
  width: 18px;
  height: 16px;

  background-color: ${palette.keycolor};
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 600;
  color: ${palette.비강조4};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
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

const TopShadow = styled.div<{
  isOverThree: boolean;
  isTop: boolean;
}>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 12px;
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
  height: 12px;
  z-index: 1;
  background: linear-gradient(to top, ${palette.BG}, transparent);
  opacity: ${(props) => (props.isOverThree && !props.isBottom ? 1 : 0)};
  pointer-events: none;
`;
const Date = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${palette.비강조};
`;

export default TripCarousel;
