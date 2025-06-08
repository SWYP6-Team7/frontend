"use client";
import { APIProvider, Map, MapCameraChangedEvent, useMap } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
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

  const mapStyle = useMemo(() => {
    if (type === "국내") {
      return { width: "100%", height: 418 };
    }
    return target ? { width: "100%", height: 400 } : { width: "100%", height: 192 };
  }, [type, target]);

  const onCameraChanged = useCallback((ev: MapCameraChangedEvent) => {
    console.log("camera changed:", ev.detail.center, ev.detail.zoom);
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
      <Map
        key={`${type}-${center?.lat}-${center?.lng}-${zoom}`}
        defaultCenter={center}
        defaultZoom={zoom}
        id="travel-map"
        mapId={process.env.NEXT_PUBLIC_LOG_GOOGLE_MAP_ID || ""}
        style={mapStyle}
        mapTypeId="roadmap"
        disableDefaultUI
        onCameraChanged={onCameraChanged}
      >
        <TravelLog type={type} highlightedRegions={highlightedRegions} />
      </Map>
    </APIProvider>
  );
};

const TravelLog = ({ type, highlightedRegions = [] }: { type: "세계" | "국내"; highlightedRegions?: string[] }) => {
  const map = useMap();

  const geoJsonData = useMemo(() => (type === "국내" ? sigoonGeoJsonData : countryGeoJsonData), [type]);

  const isHighlighted = useMemo(() => createHighlighter(highlightedRegions, cityDistricts), [highlightedRegions]);

  const getFeatureStyle = useCallback(
    (feature: google.maps.Data.Feature) => {
      const regionName =
        feature.getProperty("name_ko") || feature.getProperty("CTP_KOR_NM") || feature.getProperty("SIG_KOR_NM");

      const highlighted = isHighlighted(regionName as string);

      return {
        strokeColor: "#fff",
        strokeWeight: 1,
        strokeOpacity: 1,
        fillColor: highlighted ? "#3366FF" : "#FFFFFF",
        fillOpacity: highlighted ? 1 : 0,
      };
    },
    [isHighlighted]
  );

  useEffect(() => {
    if (!map) return;

    const geoJsonLayer = new google.maps.Data({ map });

    geoJsonLayer.addGeoJson(geoJsonData);

    geoJsonLayer.setStyle(getFeatureStyle);

    return () => {
      geoJsonLayer.setMap(null);
    };
  }, [map, geoJsonData, getFeatureStyle]);

  return null;
};

const createHighlighter =
  (highlightedRegions: string[], cityDistricts: Record<string, string[]>) => (regionName: string) =>
    highlightedRegions.includes(regionName) ||
    highlightedRegions.some((region) => cityDistricts[region]?.includes(regionName));

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
