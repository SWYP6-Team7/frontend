import React, { useCallback, useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";
import { getDateByPlanOrder } from "@/utils/time";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import Spacing from "./Spacing";
import { useInView } from "react-intersection-observer";
import { SpotType } from "@/model/trip";
import TripCarouselItem from "./TripCarouselItem";

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

  const updateSelectedIndex = () => {
    if (emblaApi) {
      props.setOpenItemIndex(emblaApi.selectedScrollSnap());
    }
  };

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
                    <Title>Day {item.planOrder}</Title>
                    <Date>{getDateByPlanOrder(props.startDate, item.planOrder)}</Date>
                    <Count>{item.spots.length}</Count>
                  </TitleContainer>
                  <Spacing size={16} />
                  <TripCarouselItem spots={item.spots} />
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

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #000;
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

const Date = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${palette.비강조};
`;

export default TripCarousel;
