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

const KakaoMap = ({ lat, lng, zoom, positions }: KakaoMapProps) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  const getInitialSettings = () => {
    let initialCenter = { lat: lat || 0, lng: lng || 0 };
    let initialZoom = zoom || 10;

    if (positions && positions.length > 0) {
      try {
        const lats = positions.map((pos) => pos.lat);
        const lngs = positions.map((pos) => pos.lng);

        initialCenter = {
          lat: (Math.min(...lats) + Math.max(...lats)) / 2,
          lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
        };
      } catch (error) {
        console.error("좌표 계산 오류:", error);
      }
    }

    return { initialCenter, initialZoom };
  };

  const { initialCenter, initialZoom } = getInitialSettings();
  const mapRef = useRef<any>(null);
  const overlaysRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  // 스크립트 로드 분리 (최초 1회만 실행)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isScriptLoaded) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

    const handleLoad = () => {
      window.kakao.maps.load(() => {
        setIsScriptLoaded(true);
        initializeMap();
      });
    };

    script.addEventListener("load", handleLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      document.head.removeChild(script);
    };
  }, []);

  // 지도 초기화 함수
  const initializeMap = useCallback(() => {
    const container = document.getElementById("map");
    if (!container) return;

    const coords = new window.kakao.maps.LatLng(initialCenter.lat, initialCenter.lng);

    mapRef.current = new window.kakao.maps.Map(container, {
      center: coords,
      level: initialZoom,
    });
  }, [initialCenter, initialZoom]);

  // 위치 변경 시 업데이트
  useEffect(() => {
    if (!mapRef.current || !isScriptLoaded) return;

    // 기존 오버레이 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    // 기존 폴리라인 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    // 새 마커 생성
    if (positions?.length) {
      const newOverlays = positions.map((position, index) => {
        const markerContent = document.createElement("div");
        markerContent.style.cssText = `
          width: 30px; height: 30px; border-radius: 50%;
          background-color: purple; color: white;
          text-align: center; line-height: 30px;
          font-weight: bold; font-size: 14px; user-select: none;
        `;
        markerContent.textContent = (index + 1).toString();

        return new window.kakao.maps.CustomOverlay({
          map: mapRef.current,
          position: new window.kakao.maps.LatLng(position.lat, position.lng),
          content: markerContent,
          yAnchor: 1,
        });
      });

      overlaysRef.current = newOverlays;

      // 폴리라인 생성
      const linePath = positions.map((position) => new window.kakao.maps.LatLng(position.lat, position.lng));

      polylineRef.current = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 3,
        strokeColor: "black",
        strokeOpacity: 0.7,
        strokeStyle: "dashed",
      });

      polylineRef.current.setMap(mapRef.current);
    }

    // 지도 중심 재설정
    mapRef.current.setCenter(new window.kakao.maps.LatLng(initialCenter.lat, initialCenter.lng));
  }, [positions, initialCenter, isScriptLoaded]);

  // 확대/축소 및 중심 좌표 변경
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.setLevel(zoom);
    mapRef.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
  }, [lat, lng, zoom]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" style={{ height: "100%", width: "100%" }} />
    </div>
  );
};
export default KakaoMap;
