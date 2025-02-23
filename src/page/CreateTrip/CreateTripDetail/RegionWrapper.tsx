"use client";
import ArrowIcon from "@/components/icons/ArrowIcon";
import PlaceIcon from "@/components/icons/PlaceIcon";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React from "react";

interface RegionWrapperProps {
  region: string;
}

const RegionWrapper = ({ region }: RegionWrapperProps) => {
  return (
    <Container>
      <PlaceIconContainer>
        <PlaceIcon width={21} height={24} />
      </PlaceIconContainer>
      <TextContainer>
        <Region>{region}</Region>
        <Small>일본 도쿄</Small>
      </TextContainer>
      <ArrowIconContainer>
        <ArrowIcon />
      </ArrowIconContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 42px;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const Region = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${palette.기본};
  line-height: 16px;
`;

const Small = styled.div`
  line-height: 16px;
  font-size: 12px;
  color: ${palette.비강조};
  font-weight: 400;
`;

export default RegionWrapper;
