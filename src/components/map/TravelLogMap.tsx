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
    // 고차 함수로 사용
    const createHighlighter = (highlightedRegions, cityDistricts) => (regionName) =>
      highlightedRegions.includes(regionName) ||
      highlightedRegions.some((region) => cityDistricts[region]?.includes(regionName));

    // 하이라이트 함수 만들기
    const isHighlighted = createHighlighter(highlightedRegions, cityDistricts);

    //스타일 적용
    geoJsonLayer.setStyle((feature) => {
      const regionName =
        feature.getProperty("name_ko") || feature.getProperty("CTP_KOR_NM") || feature.getProperty("SIG_KOR_NM");

      const highlighted = isHighlighted(regionName);

      return {
        strokeColor: "#fff",
        strokeWeight: 1,
        strokeOpacity: 1,
        fillColor: highlighted ? "#3366FF" : "#FFFFFF",
        fillOpacity: highlighted ? 1 : 0,
      };
    });
  }, [map]);

  return null;
};

// 더미 함수 클릭이나 출처 표시 함수
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
