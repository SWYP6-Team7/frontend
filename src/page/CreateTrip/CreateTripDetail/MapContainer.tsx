"use client";
import GoogleMap from "@/components/map/GoogleMap";
import KakaoMap from "@/components/map/KakaoMap";
import { createTripStore } from "@/store/client/createTripStore";
import styled from "@emotion/styled";
import React from "react";

interface MapContainerProps {
  lat: number;
  lng: number;
  zoom: number;
  isMapFull: boolean;
}

const MapContainer = (props: MapContainerProps) => {
  const { mapType, initGeometry } = createTripStore();

  console.log(initGeometry);
  if (initGeometry === null) return null;
  if (mapType === "google") {
    return (
      <Container isMapFull={props.isMapFull}>
        <GoogleMap {...props} />
      </Container>
    );
  } else {
    return (
      <Container isMapFull={props.isMapFull}>
        <KakaoMap {...props} />
      </Container>
    );
  }
};

const Container = styled.div<{ isMapFull: boolean }>`
  width: 100%;

  transform: scaleX(${(props) => (props.isMapFull ? "1.15" : "1")});
  height: ${(props) => (props.isMapFull ? "300px" : "177px")};

  transition: all 0.2s ease-in-out;
  min-height: 177px;
`;

export default MapContainer;
