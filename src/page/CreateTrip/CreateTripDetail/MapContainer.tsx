"use client";
import GoogleMap, { PoiMarkers } from "@/components/map/GoogleMap";
import KakaoMap from "@/components/map/KakaoMap";
import styled from "@emotion/styled";
import React from "react";

interface MapContainerProps {
  lat: number;
  lng: number;
  zoom: number;
  isMapFull: boolean;
  index?: null | number;
  locationName: {
    mapType: string;
    locationName: string;
  };
  plans: any[];
}

const MapContainer = (props: MapContainerProps) => {
  // 현재 선택된 계획(plan) 가져오기
  const currentPlan =
    props.index !== null && props.index !== undefined
      ? props.plans.find((plan) => plan.planOrder === props.index!)
      : null;

  // spots 데이터를 기반으로 GoogleMap과 KakaoMap에 필요한 데이터를 생성
  const positions = currentPlan
    ? currentPlan.spots.map((spot) => ({
        lat: spot.latitude,
        lng: spot.longitude,
        title: spot.name,
      }))
    : [];
  console.log(currentPlan, "plancurrent", props);
  // GoogleMap과 KakaoMap을 조건부로 렌더링
  if (props.locationName.mapType === "google") {
    return (
      <Container key={props.locationName.mapType} isMapFull={props.isMapFull}>
        <GoogleMap lat={props.lat} lng={props.lng} zoom={props.zoom}>
          {/* Google Map의 PoiMarkers 컴포넌트 사용 */}
          <PoiMarkers
            pois={positions.map((pos, idx) => ({
              key: `${idx}`,
              location: { lat: pos.lat, lng: pos.lng },
              title: pos.title,
            }))}
          />
        </GoogleMap>
      </Container>
    );
  } else {
    return (
      <Container key={props.locationName.mapType} isMapFull={props.isMapFull}>
        <KakaoMap
          lat={props.lat}
          lng={props.lng}
          zoom={props.zoom}
          positions={positions} // KakaoMap은 positions 배열을 직접 받음
        />
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
