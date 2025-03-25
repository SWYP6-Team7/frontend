import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  lat: number;
  lng: number;
  zoom: number;
  positions?: { lat: number; lng: number }[];
}

const KakaoMap = ({ lat, lng, zoom, positions = [] }: KakaoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

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

        const latRange = Math.max(...lats) - Math.min(...lats);
        const lngRange = Math.max(...lngs) - Math.min(...lngs);
        let maxRange = Math.max(latRange, lngRange);

        const zoomLevel = Math.log2(360 / maxRange);

        console.log("zoomLefvel", zoomLevel);
        // 카카오 지도 줌 레벨 범위: 1-14
        initialZoom = Math.min(14, Math.max(1, Math.round(zoomLevel)));
        // 추가 여유 공간을 위해 줌 레벨 조정
        initialZoom = Math.max(1, initialZoom - 1);
      } catch (error) {
        console.error("좌표 계산 오류:", error);
      }
    }

    return { initialCenter, initialZoom };
  };

  const { initialCenter, initialZoom } = getInitialSettings();
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(script);
    const handleLoad = () => {
      window.kakao.maps.load(() => {
        let coords = new window.kakao.maps.LatLng(
          initialCenter.lat,
          initialCenter.lng
        );

        // 지도를 담을 영역의 DOM 레퍼런스
        let container = document.getElementById("map");

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        let options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: coords, // 지도의 중심좌표
          level: initialZoom, // 지도의 확대 레벨
        };
        let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        // Use a purple marker with a number inside
        if (positions) {
          for (let i = 0; i < positions.length; i++) {
            // Create a custom marker content with purple background and number
            let markerContent = document.createElement("div");
            markerContent.style.cssText = `
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: purple;
                color: white;
                text-align: center;
                line-height: 30px;
                font-weight: bold;
                font-size: 14px;
                user-select: none;
              `;
            markerContent.innerText = (i + 1).toString();

            // Create a custom overlay to display the marker
            let customOverlay = new window.kakao.maps.CustomOverlay({
              map: map,
              position: new window.kakao.maps.LatLng(
                positions[i].lat,
                positions[i].lng
              ),
              content: markerContent,
              yAnchor: 1, // Adjust the anchor to properly position the marker
            });
          }

          // Dashed Polyline
          var linePath: any[] = [];
          for (var i = 0; i < positions.length; i++) {
            linePath.push(
              new window.kakao.maps.LatLng(positions[i].lat, positions[i].lng)
            );
          }

          var polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 3,
            strokeColor: "black", // Line color
            strokeOpacity: 0.7,
            strokeStyle: "dashed", // Dashed line
          });

          polyline.setMap(map);
        }

        map.setCenter(coords);
      });
    };
    script.addEventListener("load", handleLoad);

    return () => {
      script.removeEventListener("load", handleLoad);
      document.head.removeChild(script);
    };
  }, [
    lat,
    lng,
    zoom,
    JSON.stringify(positions),
    JSON.stringify(initialCenter),
    initialZoom,
  ]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" style={{ height: "100%", width: "100%" }} />
    </div>
  );
};
export default KakaoMap;
