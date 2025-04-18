"use client";
import { APIProvider, Map, MapCameraChangedEvent, useMap } from "@vis.gl/react-google-maps";
import React, { useEffect, useRef } from "react";
import sigoonGeoJsonData from "../../../public/geojson/korea.json";
import countryGeoJsonData from "../../../public/geojson/country.json";
import { cityDistricts, getMapLocation } from "@/utils/travellog/travelLog";

const TravelLogMap = ({
  target,
  type,
  highlightedRegions = [],
}: {
  target: string | null;
  type: "세계" | "국내";
  highlightedRegions?: string[];
}) => {
  const { center, zoom } = getMapLocation(target, type);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
      <Map
        key={`${type} ${center} ${zoom} `}
        defaultCenter={center}
        defaultZoom={zoom}
        id="travel-map"
        mapId={process.env.NEXT_PUBLIC_LOG_GOOGLE_MAP_ID || ""}
        style={
          type === "국내"
            ? { width: "100%", height: 418 }
            : target
              ? { width: "100%", height: 400 }
              : { width: "100%", height: 192 }
        }
        mapTypeId={"roadmap"}
        disableDefaultUI
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log("camera changed:", ev.detail.center, ev.detail.zoom)
        }
      >
        <TravelLog type={type} highlightedRegions={highlightedRegions} />
      </Map>
    </APIProvider>
  );
};

const TravelLog = ({ type, highlightedRegions = [] }: { type: "세계" | "국내"; highlightedRegions?: string[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const geoJsonLayer = new google.maps.Data({ map });

    geoJsonLayer.addGeoJson(type === "국내" ? sigoonGeoJsonData : countryGeoJsonData);

    geoJsonLayer.setStyle({
      strokeColor: "#fff",
      strokeWeight: 1,
      strokeOpacity: 1,
      fillOpacity: 0, // 투명한 채우기
    });

    geoJsonLayer.addGeoJson(type === "국내" ? sigoonGeoJsonData : countryGeoJsonData);

    geoJsonLayer.setStyle((feature) => {
      const regionName: any =
        feature.getProperty("name_ko") || // 대륙/국가에 사용될 수 있는 속성명
        feature.getProperty("CTP_KOR_NM") || // 한국 시도 속성명
        feature.getProperty("SIG_KOR_NM"); // 한국 시군구 속성명

      // 하이랑이트 함수

      const shouldHighlight = () => {
        // 1. 직접 일치 (시/군/구명)
        if (highlightedRegions.includes(regionName)) return true;

        // 2. cityDistricts의 key(예: "서울")가 하이라이트 대상인 경우
        for (const region of highlightedRegions) {
          if (cityDistricts[region]?.includes(regionName)) {
            return true;
          }
        }
        return false;
      };

      const isHighlighted = shouldHighlight();

      return {
        strokeColor: "#fff",
        strokeWeight: 1,
        strokeOpacity: 1,
        fillColor: isHighlighted ? "#3366FF" : "#FFFFFF", // 하이라이트된 지역은 파란색
        fillOpacity: isHighlighted ? 0.6 : 0, // 하이라이트된 지역만 채우기 표시
      };
    });
  }, [map]);

  return null;
};

// function createAttribution() {
//   const attributionLabel = document.createElement("div");
//   // Define CSS styles.
//   attributionLabel.style.backgroundColor = "#fff";
//   attributionLabel.style.opacity = "0.7";
//   attributionLabel.style.fontFamily = "Roboto,Arial,sans-serif";
//   attributionLabel.style.fontSize = "10px";
//   attributionLabel.style.padding = "2px";
//   attributionLabel.style.margin = "2px";
//   attributionLabel.textContent = "Data source: NYC Open Data";
//   return attributionLabel;
// }

// useEffect(() => {
//   if (!map) return;

//   const attributionControl = createAttribution();

//   if (google && google.maps && google.maps.ControlPosition) {
//     map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(attributionControl);
//   }

//   return () => {
//     const index = map?.controls[google.maps.ControlPosition.LEFT_BOTTOM].getArray().indexOf(attributionControl);
//     if (index !== -1 && index) {
//       map?.controls[google.maps.ControlPosition.RIGHT_BOTTOM].removeAt(index);
//     }
//   };
// }, [map]);

export default TravelLogMap;
