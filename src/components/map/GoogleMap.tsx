"use client";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";

type Poi = { key: string; location: google.maps.LatLngLiteral };

export const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: google.maps.Marker }>(
    {}
  );

  useEffect(() => {
    // 기존 마커 제거
    Object.values(markers).forEach((marker) => marker.setMap(null));
    setMarkers({});

    // 새로운 마커 생성 및 폴리라인 설정
    const newMarkers: { [key: string]: google.maps.Marker } = {};
    const linePath: google.maps.LatLng[] = [];

    props.pois.forEach((poi, index) => {
      const position = new google.maps.LatLng(
        poi.location.lat,
        poi.location.lng
      );
      linePath.push(position);

      // Custom 마커 생성
      const customMarker = new google.maps.Marker({
        position: position,
        map: map,
        label: {
          text: String(index + 1),
          color: "#fff", // 흰색 숫자
          fontSize: "14px",
          fontWeight: "bold",
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#6A5ACD", // 보라색 배경
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#fff", // 흰색 테두리
        },
      });

      newMarkers[poi.key] = customMarker;
    });

    setMarkers(newMarkers);

    // 폴리라인 설정
    const flightPath = new google.maps.Polyline({
      path: linePath,
      geodesic: true,
      strokeColor: "#000000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 2,
            strokeColor: "#000000",
          },
          offset: "0",
          repeat: "10px",
        },
      ],
    });

    flightPath.setMap(map);

    // Cleanup function
    return () => {
      flightPath.setMap(null);
      Object.values(newMarkers).forEach((marker) => marker.setMap(null));
    };
  }, [JSON.stringify(props.pois), map]);

  return null; // 더 이상 JSX 요소를 렌더링하지 않음
};
interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom: number;
  children?: React.ReactNode;
  positions?: any[];
}

const GoogleMap = ({
  lat,
  lng,
  zoom,
  positions = [],
  children,
}: GoogleMapProps) => {
  const getInitialSettings = () => {
    const MAP_WIDTH = 400;
    const MAP_HEIGHT = 300;
    let initialCenter = { lat, lng };
    let initialZoom = zoom ?? 7; // 기본 줌 레벨

    if (positions?.length > 0) {
      try {
        const lats = positions.map((p) => p.lat);
        const lngs = positions.map((p) => p.lng);

        initialCenter = {
          lat: (Math.min(...lats) + Math.max(...lats)) / 2,
          lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
        };

        if (positions?.length === 1) {
          initialZoom = 6;
          return { initialCenter, initialZoom };
        }
        const latRange = Math.max(...lats) - Math.min(...lats);
        const lngRange = Math.max(...lngs) - Math.min(...lngs);

        // 위도, 경도 범위 중 큰 값 사용
        const maxRange = Math.max(latRange, lngRange);

        // 줌 레벨 계산 (로그 스케일 사용)
        const zoomLevel = Math.log2(360 / maxRange);
        console.log("google zoom level", initialZoom);
        // 구글 지도 줌 레벨 범위: 0-21
        initialZoom = Math.min(21, Math.max(4, Math.round(zoomLevel)));
      } catch (error) {
        console.error("좌표 계산 오류:", error);
      }
    }

    return { initialCenter, initialZoom };
  };
  const { initialCenter, initialZoom } = getInitialSettings();
  console.log(initialCenter, initialZoom, "init");
  if (typeof window === "undefined") {
    return <></>;
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
        <Map
          key={`${initialCenter.lat},${initialCenter.lng},${initialZoom}`}
          defaultCenter={initialCenter}
          defaultZoom={initialZoom}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
          disableDefaultUI
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log("camera changed:", ev.detail.center)
          }
        >
          {children}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
