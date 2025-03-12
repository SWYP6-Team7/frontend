import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";
import { getDateByIndex } from "@/utils/time";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  index: number;
  startDate: string;
  inView?: React.ReactNode;
};

const TripCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  console.log("slide", props.index, props.slides);
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
                  </TitleContainer>
                  {index === slides.length - 1 && props.inView}
                </Tab>
              </Item>
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
  --slide-spacing: 1rem;
  --slide-size: 70%;
`;
const Viewport = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(1rem * -1);
`;
const Slide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 86%;
  min-width: 0;
  padding-left: 1rem;
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
  display: flex;
  font-size: 16px;
  line-height: 16px;
  align-items: center;
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
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${palette.비강조};
`;

export default TripCarousel;
